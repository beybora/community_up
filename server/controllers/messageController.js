const Message = require("../models/messageSchema");
const User = require("../models/userSchema");
const Chat = require("../models/chatSchema");
const Group = require("../models/groupSchema");

const allMessages = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.id })
      .populate("senderId", "name email")
      .populate("chat");

    if (!messages) {
      return res.status(404).json({ message: "Messages not found" });
    }

    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const sendMessage = async (req, res) => {
  const { content, groupId } = req.body;
  const userId = req.user._id;

  if (!userId) {
    return res.status(400).json({ error: "User ID not found" });
  }

  if (!content || !groupId) {
    return res.sendStatus(400).json({ error: "Content or groupId missing" });
  }

  try {
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(400).json({ error: "Group not found" });
    }

    const chatId = group.chat;

    const newMessage = {
      chat: chatId,
      senderId: userId,
      content: content,
    };

    let message = await Message.create(newMessage);

    message = await message.populate("senderId", "username  email");
    message = await message.populate("chat");

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      { latestMessage: message._id },
      { new: true }
    );

    res.json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { allMessages, sendMessage };

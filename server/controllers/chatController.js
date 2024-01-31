const Chat = require("../models/chatSchema");
const Group = require("../models/groupSchema");
const User = require("../models/userSchema");

const getAllChatsOfUser = async (req, res) => {
  try {
    const groupChats = await Chat.find({
      isGroupChat: true,
      users: req.user._id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    groupChats = await User.populate(groupChats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    res.status(200).json(groupChats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({ message: "Please Fill all the fields" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .json({ message: "More than 2 users are required to form a group chat" });
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404).json({ message: "Chat Not Found" });
  } else {
    res.json(updatedChat);
  }
};

const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404).json({ message: "Chat Not Found" });
  } else {
    res.json(removed);
  }
};


const addToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    res.status(404).json({ message: "Chat Not Found" });
  } else {
    res.json(added);
  }
};

module.exports = {
  getAllChatsOfUser,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};

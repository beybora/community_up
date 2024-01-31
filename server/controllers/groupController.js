const Chat = require("../models/chatSchema");
const Community = require("../models/communitySchema");
const Group = require("../models/groupSchema");

const getAllGroups = async (req, res) => {
  try {
    const allGroups = await Group.find()
      .populate("members")
      .populate("events")
      .populate("chat");
    res.status(200).json(allGroups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("members")
      .populate("events")
      .populate("chat");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGroup = async (req, res) => {
  try {
    const { name, description, community } = req.body;

    // Create the group
    const newGroup = await Group.create({
      name,
      description,
      community: community,
    });
    
    // Update the groups array in the associated community
    console.log("community", community)
    const updatedCommunity = await Community.findByIdAndUpdate(
      community,
      { $push: { groups: newGroup._id } },
      { new: true }
    );

    console.log("updatedCommunity", community)

    // Make sure the community is updated successfully
    if (!updatedCommunity) {
      throw new Error("Community not found or not updated.");
    }

    // Create a chat for the group
    const newChat = await Chat.create({
      name: `${newGroup.name} Chat`,
      isGroupChat: true,
      group: newGroup._id,
    });

    // Update the chatId in the group
    await Group.findByIdAndUpdate(
      newGroup._id,
      { chat: newChat._id },
      { new: true }
    );

    // Update the groupId in the chat
    await Chat.findByIdAndUpdate(
      newChat._id,
      { group: newGroup._id },
      { new: true }
    );

    res.status(201).json(newGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateGroupById = async (req, res) => {
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteGroupById = async (req, res) => {
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);
    if (!deletedGroup) {
      return res.status(404).json({ message: "Group not found" });
    }
    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPublicGroups = async (req, res) => {
  try {
    const publicGroups = await Group.find({ private: false })
      .populate("members")
      .populate("events")
      .populate("chat");

    res.status(200).json(publicGroups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGroupsByCommunity = async (req, res) => {
  try {
    const { community } = req.body;
    const groupsInCommunity = await Group.find({ community: community })
      .populate("members")
      .populate("events")
      .populate("chat");

    res.status(200).json(groupsInCommunity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGroupsByMember = async (req, res) => {
  try {
    const memberId = req.params.memberId;
    const memberGroups = await Group.find({ members: memberId })
      .populate("members")
      .populate("events")
      .populate("chat");

    res.status(200).json(memberGroups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroupById,
  deleteGroupById,
  getPublicGroups,
  getGroupsByCommunity,
  getGroupsByMember,
};

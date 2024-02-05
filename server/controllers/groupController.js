const Chat = require("../models/chatSchema");
const Community = require("../models/communitySchema");
const Group = require("../models/groupSchema");
const User = require("../models/userSchema");

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

const createGroupAndAddToCommunity = async (req, res) => {
  try {
    const { name, description } = req.body;
    const communityId = req.params.id;
    const userId = req.user._id;

    const newGroup = await Group.create({
      name,
      description,
      community: communityId,
      members: [userId],
    });

    const updatedCommunity = await Community.findByIdAndUpdate(
      communityId,
      { $push: { groups: newGroup._id } },
      { new: true }
    );

    if (!updatedCommunity) {
      throw new Error("Community not found or not updated.");
    }

    const newChat = await Chat.create({
      name: `${newGroup.name} Chat`,
      isGroupChat: true,
      group: newGroup._id,
    });

    await Group.findByIdAndUpdate(
      newGroup._id,
      { chat: newChat._id },
      { new: true }
    );

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
  console.log("test");
  try {
    const communityId = req.params.communityId;
    console.log(communityId, "id");
    const groupsInCommunity = await Group.find({ community: communityId })
      .populate("members")
      .populate("events")
      .populate("chat");
    console.log(groupsInCommunity, "groupsInCommunity");
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

const joinGroup = async (req, res) => {
  try {
    const { userId, groupId, communities } = req.body;

    const group = await Group.findById(groupId);

    // Check if the user is a member of the community associated with the group
    const isUserInCommunity = communities.includes(group.community.toString());
    if (!isUserInCommunity) {
      return res
        .status(403)
        .json({ message: "User is not a member of the community" });
    }

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    await Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: userId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { groups: groupId } },
      { new: true }
    );

    res.status(200).json({ message: "User joined group successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllGroups,
  getGroupById,
  createGroupAndAddToCommunity,
  updateGroupById,
  deleteGroupById,
  getPublicGroups,
  getGroupsByCommunity,
  getGroupsByMember,
  joinGroup,
};

const Community = require("../models/communitySchema");
const Place = require("../models/placeSchema");
const User = require("../models/userSchema");
const Group = require("../models/groupSchema");
const Chat = require("../models/chatSchema");
const Message = require("../models/messageSchema");

const createCommunity = async (req, res) => {
  try {
    const { name, description, isPrivate } = req.body;
    const { location, _id } = req.user;

    const newCommunity = await Community.create({
      name,
      description,
      isPrivate,
      location: location,
      admins: [_id],
      members: [_id],
    });

    await Place.findByIdAndUpdate(
      location,
      { $push: { communities: newCommunity._id } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      _id,
      {
        $push: { communities: newCommunity._id },
        $addToSet: { admin: newCommunity._id },
      },
      { new: true }
    );
    res.status(201).json(newCommunity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCommunities = async (req, res) => {
  try {
    const allCommunities = await Community.find();
    res.status(200).json(allCommunities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommunityById = async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }
    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCommunityById = async (req, res) => {
  try {
    const updatedCommunity = await Community.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCommunity) {
      return res.status(404).json({ message: "Community not found" });
    }
    res.status(200).json(updatedCommunity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCommunityById = async (req, res) => {
  try {
    const communityId = req.params.id;

    console.log("communityId", communityId);
    // Delete all groups in the community
    await Group.deleteMany({ community: communityId });

    const groups = await Group.find({ community: communityId });

    const groupIds = groups.map((group) => group._id);
    await Chat.deleteMany({ group: { $in: groupIds } });

    const chatIds = groups.flatMap((group) => group.chat);
    await Message.deleteMany({ chat: { $in: chatIds } });

    const deletedCommunity = await Community.findByIdAndDelete(communityId);

    if (!deletedCommunity) {
      return res.status(404).json({ message: "Community not found" });
    }

    res
      .status(200)
      .json({ message: "Community and associated data deleted successfully" });
  } catch (error) {
    console.error(
      "Error deleting community and associated data:",
      error.message
    );
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCommunitiesByPlace = async (req, res) => {
  try {
    const placeId = req.user.location;

    const communitiesInPlace = await Community.find({ location: placeId });

    res.status(200).json(communitiesInPlace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const joinCommunity = async (req, res) => {
  try {
    const communityId = req.params.id;
    const userId = req.user._id;

    await Community.findByIdAndUpdate(
      communityId,
      { $addToSet: { members: userId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { communities: communityId } },
      { new: true }
    );

    res.status(200).json({ message: "User joined community successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJoinedCommunities = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const joinedCommunities = await Community.find({
      _id: { $in: user.communities },
    });

    res.status(200).json(joinedCommunities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const leaveCommunity = async (req, res) => {
  const userId = req.user._id;
  const communityId = req.params.id;

  try {
    const user = await User.findById(userId);
    const community = await Community.findById(communityId);

    if (!user || !community) {
      return res.status(404).json({ message: "User or Community not found" });
    }

    const index = community.members.indexOf(userId);
    if (index > -1) {
      community.members.splice(index, 1);
      community.markModified("members");
      await community.save();
    } else {
      return res.status(400).json({
        message:
          "User is not a member of this community - can't find user in community member list",
      });
    }

    const userIndex = user.communities.indexOf(communityId);
    if (userIndex > -1) {
      user.communities.splice(userIndex, 1);
      user.markModified("communities");
      await user.save();
    } else {
      return res.status(400).json({
        message:
          "User is not a member of this community - can't find community in user communities list",
      });
    }

    res.status(200).json({ message: "Successfully left the community" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error leaving the community", error: error.message });
  }
};

module.exports = {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  updateCommunityById,
  deleteCommunityById,
  getCommunitiesByPlace,
  joinCommunity,
  getJoinedCommunities,
  leaveCommunity,
};

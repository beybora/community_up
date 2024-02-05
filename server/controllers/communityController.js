const Community = require("../models/communitySchema");
const Place = require("../models/placeSchema");
const User = require("../models/userSchema");

const createCommunity = async (req, res) => {
  try {
    const { name, description, isPrivate } = req.body;
    const { location, _id } = req.user;

    const newCommunity = await Community.create({
      name,
      description,
      isPrivate,
      location: location,
      members: [_id],
    });

    await Place.findByIdAndUpdate(
      location,
      { $push: { communities: newCommunity._id } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      _id,
      { $push: { communities: newCommunity._id } },
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
    const deletedCommunity = await Community.findByIdAndDelete(req.params.id);
    if (!deletedCommunity) {
      return res.status(404).json({ message: "Community not found" });
    }
    res.status(200).json({ message: "Community deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

    console.log("userId", userId);
    console.log("communityId", communityId);

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

module.exports = {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  updateCommunityById,
  deleteCommunityById,
  getCommunitiesByPlace,
  joinCommunity,
  getJoinedCommunities,
};

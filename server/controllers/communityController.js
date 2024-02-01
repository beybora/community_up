const Community = require("../models/communitySchema");
const Place = require("../models/placeSchema");
const User = require("../models/userSchema");

const createCommunity = async (req, res) => {
  try {
    const { name, description, isPrivate, location } = req.body;

    const newCommunity = await Community.create({
      name,
      description,
      isPrivate,
      location: location,
    });

    await Place.findByIdAndUpdate(
      location,
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
    const userLocationId = req.user.location;
    
    const communitiesInPlace = await Community.find({ location: userLocationId });

    res.status(200).json(communitiesInPlace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const joinCommunity = async (req, res) => {
  try {
    const { userId, communityId } = req.body;

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


module.exports = {
  createCommunity,
  getAllCommunities,
  getCommunityById,
  updateCommunityById,
  deleteCommunityById,
  getCommunitiesByPlace,
  joinCommunity,
};

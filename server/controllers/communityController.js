const Community = require("../models/communitySchema");

const createCommunity = async (req, res) => {
  try {
    const newCommunity = await Community.create(req.body);
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
    const placeId = req.params.placeId;

    const communitiesInPlace = await Community.find({ location: placeId });

    res.status(200).json(communitiesInPlace);
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
};

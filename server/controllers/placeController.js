const Place = require("../models/placeSchema");

const getAllPlaces = async (req, res) => {
  try {
    const allPlaces = await Place.find().populate("communities");
    res.status(200).json(allPlaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate("communities");

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPlace = async (req, res) => {
  try {
    const { name, country } = req.body;
    
    const newPlace = await Place.create({ name, country });

    res.status(201).json({ message: "Place created successfully", place: newPlace });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePlaceById = async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePlaceById = async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    if (!deletedPlace) {
      return res.status(404).json({ message: "Place not found" });
    }
    res.status(200).json({ message: "Place deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPlaces,
  getPlaceById,
  createPlace,
  updatePlaceById,
  deletePlaceById,
};

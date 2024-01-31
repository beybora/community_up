const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: { type: String },
    country: { type: String },
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;

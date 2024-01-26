const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: { type: String },
    country: { type: String },
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);

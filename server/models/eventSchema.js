const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: null },
    date: { type: Date, required: true },
    isPrivate: { type: Boolean, default: false },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    community: { type: mongoose.Schema.Types.ObjectId, ref: "Community" },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    place: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Event", eventSchema);

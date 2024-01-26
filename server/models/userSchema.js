const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
    currentLocation: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    socialStatusRecords: [{ type: Number }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const bcrypt = require("becrypt");

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

userSchema.path("email").validate(async () => {
    const isEmailUnique = await mongoose.m
});

userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await becrypt.has(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.error(error);
  }
});


module.exports = mongoose.model("User", userSchema);

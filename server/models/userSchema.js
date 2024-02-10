const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
    location: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
    communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: "Group" }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    socialStatusRecords: [{ type: Number }],
  },
  { timestamps: true }
);

//check if email is unique to collection
// userSchema.path("email").validate(async (value) => {
//   const isEmailUnique = await mongoose.models.User.countDocuments({ email: value });
//   return !isEmailUnique
// }, 'email already exists');

//safe password encyrptet via bcrypt
userSchema.pre("save", async function (next) {
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.error(error);
  }
});


const User = mongoose.model("User", userSchema);

module.exports = User;

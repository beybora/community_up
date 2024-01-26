const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS_CONNECTION_STRING);
    console.log("mongodb connection succesfull");
  } catch (error) {
    console.error("mongodb connection error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
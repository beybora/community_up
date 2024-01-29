const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsersInCommunity = async (req, res) => {
  try {
    const communityId = req.params.communityId;
    const usersInCommunity = await User.find({ communities: communityId });
    res.status(200).json(usersInCommunity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsersInEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const usersInEvent = await User.find({ events: eventId });
    res.status(200).json(usersInEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = (req, res) => {};
const login = (req, res) => {};
const logout = (req, res) => {};
const getLogged = (req, res) => {};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUsersInCommunity,
  getUsersInEvent,
  register,
  login,
  logout,
  getLogged,
};

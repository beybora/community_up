const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

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

// const searchUser = async (req, res) => {
//   try {
//     const keyword = req.query.search
//       ? {
//           $or: [
//             { name: { $regex: req.query.search, $options: "i" } },
//             { email: { $regex: req.query.search, $options: "i" } },
//           ],
//         }
//       : {};
    
//     const users = await User.find(keyword).select({ _id: { $ne: req.user._id } })
//     res.send(users);
//   } catch (error) {
//     console.error(error);
//   }
// };

const register = async (req, res) => {
  try {
    const userDoc = await User.create(req.body);
    const userPayload = {
      _id: userDoc._id,
      email: userDoc.email,
      username: userDoc.username,
      location: userDoc.location
    };
    const userToken = jwt.sign(userPayload, SECRET);
    res
      .status(201)
      .cookie("accessToken", userToken, { httpOnly: true })
      .json({ message: "user created", user: userPayload });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid login attempt" });
    }

    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return res.status(400).json({ error: "Invalid login attempt" });
    }

    const isPasswordValid = await bcrypt.compare(password, userDoc.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid login attempt" });
    }

    const userPayload = {
      _id: userDoc._id,
      email: userDoc.email,
      username: userDoc.username,
      location: userDoc.location
    };

    const userToken = jwt.sign(userPayload, SECRET, { expiresIn: "1h" });

    res
      .status(200)
      .cookie("accessToken", userToken, { httpOnly: true })
      .json({ message: "User logged in", user: userPayload });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.json({ message: "successfully loged out" });
};

const getLoggedUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).select("-password");
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUsersInCommunity,
  getUsersInEvent,
  // searchUser,
  register,
  login,
  logout,
  getLoggedUser,
};

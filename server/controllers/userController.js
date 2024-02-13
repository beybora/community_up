const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Group = require("../models/groupSchema");
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
    const userId = req.params.id;
    
    const user = await User.findById(userId)
      .populate("location") // Assuming "location" is a reference to another collection
      .populate("communities"); // Assuming "communities" is a reference to another collection

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const userData = {
      _id: user._id,
      username: user.username,
      location: user.location ? user.location : null, 
      registrationDate: user.registrationDate,
      communities: user.communities.map(community => ({
        _id: community._id,
        name: community.name,
      })),
    };

    res.status(200).json(userData);
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
      location: userDoc.location,
    };

    const expiresIn = 60 * 60 * 24 * 365;

    const userToken = jwt.sign(userPayload, SECRET, { expiresIn: expiresIn });
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
      return res.status(400).json({ error: "Invalid login attempt 1" });
    }

    const userDoc = await User.findOne({ email });

    if (!userDoc) {
      return res.status(400).json({ error: "Invalid login attempt 2 " });
    }

    const isPasswordValid = await bcrypt.compare(password, userDoc.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid login attempt 3" });
    }

    const userPayload = {
      _id: userDoc._id,
      email: userDoc.email,
      username: userDoc.username,
      location: userDoc.location,
    };
    const expiresIn = 60 * 60 * 24 * 365;

    const userToken = jwt.sign(userPayload, SECRET, { expiresIn: expiresIn });

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

const getJoinedCommunities = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("communities");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.communities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getJoinedGroups = async (req, res) => {
  try {
    const userId = req.user._id;
    const communityId = req.params.communityId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const groups = await Group.find({
      _id: { $in: user.groups },
      community: communityId,
    });

    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUserGroups = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch all groups where the user is a member
    const groups = await Group.find({
      _id: { $in: user.groups },
    });

    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  getJoinedCommunities,
  getJoinedGroups,
  getAllUserGroups,
};

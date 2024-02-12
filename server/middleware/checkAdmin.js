const Community = require("../models/communitySchema");

const checkAdmin = async (req, res, next) => {
  try {
    const communityId = req.params.id;
    const userId = req.user._id;

    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ message: "Community not found" });
    }

    const isAdmin = community.admins.includes(userId);

    if (!isAdmin) {
      return res.status(403).json({ message: "Only admins can perform this action" });
    }

    req.isAdmin = true;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = checkAdmin;

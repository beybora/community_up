const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");
const authenticate = require("../middleware/auth");

// Community routes
router.use(authenticate);
router.get("/place", communityController.getCommunitiesByPlace);
router.post("/create", communityController.createCommunity);
router.get("/", communityController.getAllCommunities);
router.get("/:id", communityController.getCommunityById);
router.put("/:id", communityController.updateCommunityById);
router.delete("/:id", communityController.deleteCommunityById);
router.post("/join-community", communityController.joinCommunity);

module.exports = router;

const express = require("express");
const router = express.Router();
const communityController = require("../controllers/communityController");
const authenticate = require("../middleware/auth");

// Community routes
router.get("/place/:placeId", communityController.getCommunitiesByPlace);
//middleware to request authentication for using routes below
//router.use(authenticate);
router.post("/create", communityController.createCommunity);
router.get("/", communityController.getAllCommunities);
router.get("/:id", communityController.getCommunityById);
router.put("/:id", communityController.updateCommunityById);
router.delete("/:id", communityController.deleteCommunityById);

module.exports = router;

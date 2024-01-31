const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");

// Define routes
router.get("/groups", groupController.getAllGroups);
router.get("/groups/:id", groupController.getGroupById);
router.post("/groups", groupController.createGroup);
router.put("/groups/:id", groupController.updateGroupById);
router.delete("/groups/:id", groupController.deleteGroupById);
router.get("/public-groups", groupController.getPublicGroups);
router.get("/groups-by-community/:communityId", groupController.getGroupsByCommunity);
router.get("/groups-by-member/:memberId", groupController.getGroupsByMember);

module.exports = router;

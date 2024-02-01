const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupController");
const authenticate = require("../middleware/auth");

// Define routes
router.use(authenticate);
router.get("/groups", groupController.getAllGroups);
router.get("/groups/:id", groupController.getGroupById);
router.post("/groups", groupController.createGroupAndAddToCommunity);
router.put("/groups/:id", groupController.updateGroupById);
router.delete("/groups/:id", groupController.deleteGroupById);
router.get("/public-groups", groupController.getPublicGroups);
router.get("/groups-by-community/:communityId", groupController.getGroupsByCommunity);
router.get("/groups-by-member/:memberId", groupController.getGroupsByMember);
router.post("/join-group/:groupId", groupController.joinGroup);

module.exports = router;

const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const authenticate = require("../middleware/auth");

// Define routes
router.use(authenticate);
router.get("/chats", chatController.getAllChatsOfUser);
router.post("/chats/group", chatController.createGroupChat);
router.put("/chats/rename", chatController.renameGroup);
router.put("/chats/groupremove", chatController.removeFromGroup);
router.put("/chats/groupadd", chatController.addToGroup); 

module.exports = router;
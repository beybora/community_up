const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Define routes
router.get("/messages/:chatId", messageController.allMessages);
router.post("/messages", messageController.sendMessage);

module.exports = router;

const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authenticate = require("../middleware/auth");

// Define routes
router.use(authenticate);
router.get("/messages/:chatId", messageController.allMessages);
router.post("/messages", messageController.sendMessage);

module.exports = router;

const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authenticate = require("../middleware/auth");

// Define routes
router.use(authenticate);
router.get("/events", eventController.getAllEvents);
router.get("/events/:id", eventController.getEventById);
router.post("/events", eventController.createEvent);
router.put("/events/:id", eventController.updateEventById);
router.delete("/events/:id", eventController.deleteEventById);

module.exports = router;

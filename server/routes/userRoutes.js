const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/users", userController.createUser);
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUserById);
router.delete("/users/:id", userController.deleteUserById);
router.get("/community/:communityId/users", userController.getUsersInCommunity);
router.get("/communit/:eventId/users", userController.getUsersInEvent);

module.exports = router;

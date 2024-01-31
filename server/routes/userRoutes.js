const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/auth");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/currentUser", authenticate, userController.getLoggedUser);
router.get("/", userController.getAllUsers);
//router.get("/search", userController.searchUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);
router.get("/community/:communityId/users", userController.getUsersInCommunity);
router.get("/event/:eventId/users", userController.getUsersInEvent);


module.exports = router;

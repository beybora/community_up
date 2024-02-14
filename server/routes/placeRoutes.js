const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");
const authenticate = require("../middleware/auth");


router.get("/places", placeController.getAllPlaces);
router.use(authenticate);
router.get("/places/:id", placeController.getPlaceById);
router.post("/places", placeController.createPlace);
router.put("/places/:id", placeController.updatePlaceById);
router.delete("/places/:id", placeController.deletePlaceById);

module.exports = router;

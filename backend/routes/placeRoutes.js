const express = require("express");
const router = express.Router();
const {getPlaceDescription} = require("../controllers/placeController");

router.get("/description/:placeId", placeController.getPlaceDescription);

module.exports = router;



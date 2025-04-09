const express = require("express");
const router = express.Router();
const controller = require("../controllers/placeInfoController");

router.post("/placeInfo", controller.getPlaceInfo);

module.exports = router;

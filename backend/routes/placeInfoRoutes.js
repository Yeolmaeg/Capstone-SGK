const express = require("express");
const router = express.Router();
const controller = require("../controllers/placeInfoController");

console.log("placeInfoRoutes 등록됨");

router.post("/placeInfo", controller.getPlaceInfo);

module.exports = router;

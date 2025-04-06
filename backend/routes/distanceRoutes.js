const express = require("express");
const router = express.Router();
const distanceController = require("../controllers/distanceController");
const travelTimeController = require("../controllers/travelTimeController");

// [기존 GET] 직선 거리만
router.get("/distance", distanceController.getDistanceInfo);

// [신규 POST] 직선 거리 + 이동수단별 소요 시간
router.post("/distance/detail", travelTimeController.getTravelInfo);

module.exports = router;

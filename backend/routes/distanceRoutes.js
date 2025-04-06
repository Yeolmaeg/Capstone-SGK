const express = require("express");
const router = express.Router();
const travelTimeController = require("../controllers/travelTimeController");

// 직선 거리 + 이동수단별 소요 시간
router.post("/distance/detail", travelTimeController.getTravelInfo);

module.exports = router;

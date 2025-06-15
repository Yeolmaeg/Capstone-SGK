const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");

// 📌 장소 추가
router.post("/", placeController.addPlace);

// 📌 장소 설명 조회
router.get("/description/:placeId", placeController.getPlaceDescription);

// 📌 장소 정보 조회 (전체 정보)
router.get("/:placeId", placeController.getPlaceById);

module.exports = router;



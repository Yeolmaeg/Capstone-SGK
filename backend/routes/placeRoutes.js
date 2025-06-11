const express = require("express");
const router = express.Router();
const {getPlaceDescription} = require("../controllers/placeController");

<<<<<<< HEAD

// 📌 장소 추가
router.post("/", placeController.addPlace);

// 📌 장소 상세 설명 조회
router.get("/description/:placeId", placeController.getPlaceDescription);
=======
router.get("/description/:placeId", getPlaceDescription);
>>>>>>> 80bdf4305df28b1c8dd131169aa32a740ab98c59

// 📌 장소 정보 조회 (ID로 검색)
router.get("/:placeId", placeController.getPlaceById);

module.exports = router;



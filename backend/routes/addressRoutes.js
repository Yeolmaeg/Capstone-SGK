const express = require("express");
const router = express.Router();
const controller = require("../controllers/addressController");
router.get("/geocode/reverse", controller.reverseGeocode); // 좌표 → 주소
router.get("/geocode", controller.geocode);                 // 주소 → 좌표


router.post("/", controller.addAddress);            // 주소 추가
router.get("/", controller.getAddresses);            // 전체 주소 조회
router.get("/:id", controller.getAddressById);  // 단일 주소 조회
router.patch("/:id", controller.updateAddress);      // 주소 이름 수정
router.delete("/:id", controller.deleteAddress);     // 주소 삭제


module.exports = router;
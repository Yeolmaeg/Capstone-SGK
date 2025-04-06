const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.post("/", controller.createUser);         // 사용자 생성
router.get("/:id", controller.getUser);           // 단일 사용자 조회
router.patch("/:id", controller.updateUser);      // 학교/시간표 수정
router.delete("/:id", controller.deleteUser);     // 사용자 삭제

module.exports = router;


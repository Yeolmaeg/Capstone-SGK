const service = require("../services/userService");
// 0407 이거 한줄 require 추가
const redis = require("../lib/redis");

// 0407 아래 함수 한개만 수정했어요
exports.createUser = async (req, res) => {
  const { email, name, school, school_id } = req.body;
  try {
    const id = await service.createUser({ email, name, school, school_id });
    
    await redis.sadd(`user:${id}:preferences`, "대학생");
    console.log(`📌 Redis에 '대학생' 키워드 추가 완료 (user:${id})`);
    
    res.status(201).json({ message: "사용자 생성 완료", id });
  } catch (err) {
    res.status(500).json({ error: "사용자 생성 실패" });
  }
};

exports.getUser = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await service.getUser(id);
      if (!user) return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "사용자 조회 실패" });
    }
  };
  
  exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { school, school_id } = req.body;
    try {
      await service.updateUser(id, { school, school_id });
      res.json({ message: "사용자 정보 수정 완료" });
    } catch (err) {
      res.status(500).json({ error: "사용자 정보 수정 실패" });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      await service.deleteUser(id);
      res.json({ message: "사용자 삭제 완료" });
    } catch (err) {
      res.status(500).json({ error: "사용자 삭제 실패" });
    }
  };
  

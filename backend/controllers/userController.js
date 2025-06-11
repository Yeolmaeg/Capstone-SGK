const service = require("../services/userService");
const redis = require("../lib/redis");
const bcrypt = require('bcryptjs');
const db = require('../lib/db');
const jwt = require('jsonwebtoken');
// const JWT_SECRET = process.env.JWT_SECRET;
const { v4: uuidv4 } = require('uuid');

const signup = async (req, res) => {
  const { email, password, name, school, school_id, start_term, end_term } = req.body;

  try {
    // 이메일 중복 확인
    const check = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (check.rows.length > 0) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();

    // 사용자 정보 DB 저장
    await db.query(
      `INSERT INTO users 
       (id, email, password, name, school, school_id, start_term, end_term)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [id, email, hashedPassword, name, school, school_id, start_term, end_term]
    );

    // Redis에 기본 선호 키워드 저장
    await redis.sadd(`user:${id}:preferences`, '대학생');
    console.log(`📌 Redis에 '대학생' 키워드 추가 완료 (user:${id})`);

    res.status(201).json({ message: '회원가입 성공', userId: id });
  } catch (err) {
    console.error('회원가입 실패:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};
/*
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
*/

// 사용자 조회
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await service.getUser(id);
    if (!user) return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "사용자 조회 실패" });
  }
};

// 사용자 수정
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { school, school_id } = req.body;
  try {
    await service.updateUser(id, { school, school_id });
    res.json({ message: "사용자 정보 수정 완료" });
  } catch (err) {
    res.status(500).json({ error: "사용자 정보 수정 실패" });
  }
};

// 사용자 삭제
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await service.deleteUser(id);
    res.json({ message: "사용자 삭제 완료" });
  } catch (err) {
    res.status(500).json({ error: "사용자 삭제 실패" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 틀렸습니다.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 틀렸습니다.' });
    }

    
    // const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: '로그인 성공',
      userId: user.id 
    });
  } catch (err) {
    console.error('로그인 실패:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 모든 함수 export
module.exports = {
  signup,
  login,
  getUser,
  updateUser,
  deleteUser
};

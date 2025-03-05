const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const { createClient } = require("redis");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL 연결 설정
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Redis 클라이언트 생성 및 연결
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on("error", (err) => console.error("❌ Redis Connection Error:", err));

redisClient.connect()
  .then(() => console.log("✅ Redis Connected!"))
  .catch(err => console.error("❌ Redis Connection Error:", err));

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// PostgreSQL 연결 확인
pool.query("SELECT NOW()")
  .then(res => console.log("✅ PostgreSQL Connected!", res.rows[0]))
  .catch(err => console.error("❌ PostgreSQL Connection Error:", err));

// Redis 연결 테스트 API
app.get("/test-redis", async (req, res) => {
  try {
    await redisClient.set("testKey", "Hello from Redis!");
    const value = await redisClient.get("testKey");
    res.json({ message: "✅ Redis Connected!", value });
  } catch (error) {
    console.error("❌ Redis Connection Error:", error);
    res.status(500).json({ error: "Redis connection failed" });
  }
});

const express = require("express");
const cors = require("cors");
const db = require("./lib/db");
const placeInfoRouter = require("./routes/place-info");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // 필요 시 JSON 파싱 추가

app.use("/api", placeInfoRouter);

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

db.query("SELECT NOW()")
  .then(res => console.log("✅ PostgreSQL Connected!", res.rows[0]))
  .catch(err => console.error("❌ PostgreSQL Connection Error:", err));

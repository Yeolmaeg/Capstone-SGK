const express = require("express");
const cors = require("cors");
const db = require("./lib/db");
const placeInfoRoutes = require("./routes/placeInfoRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", placeInfoRouter);
app.use("/api", recommendationRoutes);

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

db.query("SELECT NOW()")
  .then(res => console.log("✅ PostgreSQL Connected!", res.rows[0]))
  .catch(err => console.error("❌ PostgreSQL Connection Error:", err));

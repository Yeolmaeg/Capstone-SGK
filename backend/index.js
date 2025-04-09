const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const db = require("./lib/db");
const userRoutes = require("./routes/userRoutes");
const scheduleRoutes = require('./routes/scheduleRoutes');
const placeInfoRoutes = require("./routes/placeInfoRoutes");
const addressRoutes = require("./routes/addressRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const autoScheduleRoutes = require("./routes/autoScheduleRoutes");
// const uploadRoutes = require("./routes/uploadRoutes")
// const timetableRoutes = require("./routes/timetableRoutes");
// const distanceRoutes = require("./routes/distanceRoutes");
const dotenv = require("dotenv");
const { generateNextMonthRecurringSchedules } = require("./services/scheduleService");


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"], // 여러 개도 가능
  credentials: true
}));
app.use(express.json());
app.use("/user", userRoutes);
app.use('/api', scheduleRoutes);
app.use("/api", placeInfoRoutes);
app.use("/api/recommendation", recommendationRoutes);
app.use("/address", addressRoutes);
app.use("/api", autoScheduleRoutes);
//app.use("/upload", uploadRoutes);
//app.use("/api", timetableRoutes);
//app.use("/api", distanceRoutes);


// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

db.query("SELECT NOW()")
  .then(res => console.log("✅ PostgreSQL Connected!", res.rows[0]))
  .catch(err => console.error("❌ PostgreSQL Connection Error:", err));

// 매달 1일 00시에 반복 일정 생성(시간표 일정)
cron.schedule("0 0 1 * *", async () => {
  console.log("📆 매달 반복 일정 생성 시작");
  await generateNextMonthRecurringSchedules();
});

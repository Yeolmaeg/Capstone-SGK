const service = require("../services/scheduleService");
const db = require("../lib/db");
const { getPreviousSchedule } = require("../services/recommendationService");
const { v4: uuidv4 } = require("uuid");


// 전제 일정 조회
exports.getSchedules = async (req, res) => {
  const { user_id } = req.query;
  console.log("📥 일정 조회 요청:", user_id);
  try {
    const schedules = await service.getSchedules(user_id);
    // 이동 정보도 포함해서 응답
    const enriched = schedules.map(schedule => ({
        id: schedule.id,
        user_id: schedule.user_id,
        title: schedule.title,
        start_time: schedule.start_time,
        end_time: schedule.end_time,
        latitude: schedule.latitude,
        longitude: schedule.longitude,
        address: schedule.address,
        move_type: schedule.move_type,         
        move_duration: schedule.move_duration,
        walk_duration: schedule.walk_duration,
        transit_duration: schedule.transit_duration,
        drive_duration: schedule.drive_duration, 
        created_at: schedule.created_at,
        source: schedule.source
      }));
    res.json(enriched);
  } catch (err) {
    console.error("❌ 일정 조회 에러:", err.message);
    res.status(500).json({ error: "일정 조회 실패" });
  }
};

// 단일 일정 조회
exports.getScheduleById = async (req, res) => {
  const { id } = req.params;
  console.log("📥 단일 일정 조회 요청:", id);

  try {
    const schedule = await service.getScheduleById(id);
    if (!schedule) {
      return res.status(404).json({ error: "일정이 존재하지 않습니다." });
    }
    const enriched = {
      id: schedule.id,
      user_id: schedule.user_id,
      title: schedule.title,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      address: schedule.address,
      latitude: schedule.latitude,
      longitude: schedule.longitude,
      move_type: schedule.move_type,         
      move_duration: schedule.move_duration,
      walk_duration: schedule.walk_duration,
      transit_duration: schedule.transit_duration,
      drive_duration: schedule.drive_duration,
      created_at: schedule.created_at,
      source: schedule.source
    };

    res.json(enriched);
  } catch (err) {
    console.error("❌ 단일 일정 조회 에러:", err.message);
    res.status(500).json({ error: "일정 조회 실패" });
  }
};


// 일정 추가
exports.addSchedule = async (req, res) => {
  const { 
    user_id,
    title,
    start_time,
    end_time,
    latitude,
    longitude,
    address,
    place_id = null,
    move_type = null,
    move_duration = null,
    walk_duration = null,
    transit_duration = null,
    drive_duration = null,
    is_recurring = false,
    source = "manual"
  } = req.body;

  console.log("➕ 일정 추가 요청:", req.body);
  const id = uuidv4(); 
  const finalTitle = title || generateDefaultTitle(latitude, longitude);
  try {
    // 1️⃣ 기본 일정 하나 DB에 추가
    const insertResult = await db.query(
      `INSERT INTO schedules (
        id, user_id, title, start_time, end_time,
        latitude, longitude, address, place_id,
        move_type, move_duration,
        walk_duration, transit_duration, drive_duration,
        is_recurring, source
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
      RETURNING *`,
      [
        id, user_id, finalTitle, start_time, end_time,
        latitude, longitude, address, place_id,
        move_type, move_duration,
        walk_duration, transit_duration, drive_duration,
        is_recurring, source
      ]
    );

    const created = insertResult.rows[0];

    // 2️⃣ 반복 일정이면 4주치 추가
    if (is_recurring) {
      console.log("📌 반복 일정 생성 시작");
      await service.generateRecurringForSchedule(created);
      console.log("✅ 반복 일정 생성 완료");
    }

    res.status(201).json({ message: "일정 추가 완료", id, title: finalTitle });
  } catch (err) {
    console.error("❌ 일정 추가 에러:", err.message);
    res.status(500).json({ error: "일정 추가 실패" });
  }
};

// 기본 일정 이름 생성
function generateDefaultTitle(lat, lon) {
    if (lat && lon) {
      return `장소 (${lat.toFixed(4)}, ${lon.toFixed(4)})`;
    }
    return "방문 예정 장소";
  }

// 일정 삭제
exports.deleteSchedule = async (req, res) => {
  const { id } = req.params;
  console.log("🗑️ 일정 삭제 요청:", id);
  try {
    await service.deleteSchedule(id);
    res.json({ message: "일정 삭제 완료" });
  } catch (err) {
    console.error("❌ 일정 삭제 에러:", err.message);
    res.status(500).json({ error: "일정 삭제 실패" });
  }
};

// 일정 수정
exports.updateSchedule = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log("✏️ 일정 수정 요청:", id, data);

  try {
    await service.updateSchedule(id, data);
    res.json({ message: "일정 수정 완료" });
  } catch (err) {
    console.error("❌ 일정 수정 에러:", err.message);
    res.status(500).json({ error: "일정 수정 실패" });
  }
};



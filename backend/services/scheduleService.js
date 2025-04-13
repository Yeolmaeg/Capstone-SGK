const db = require("../lib/db");
const { v4: uuidv4 } = require("uuid");
const { getDurations } = require("../services/travelTimeService");


// 일정 전체 조회
exports.getSchedules = async (user_id) => {
  const result = await db.query(
    "SELECT * FROM schedules WHERE user_id = $1 ORDER BY start_time",
    [user_id]
  );
  return result.rows;
};

// 일정 한 개 조회
exports.getScheduleById = async (id) => {
  const result = await db.query(
    `SELECT * FROM schedules WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

// 일주일 기준 일정 조회
exports.getUserSchedulesWithinWeek = async (user_id, fromDate = new Date()) => {
  const toDate = new Date(fromDate);
  toDate.setDate(toDate.getDate() + 7);

  const result = await db.query(
    `SELECT * FROM schedules 
     WHERE user_id = $1 
     AND start_time >= $2 AND start_time <= $3
     ORDER BY start_time ASC`,
    [user_id, fromDate, toDate]
  );

  return result.rows;
};


// 일정 추가
exports.addSchedule = async ({ 
  id = uuidv4(), 
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
  color,
  source = "manual"
}) => {
  const result = await db.query(
    `INSERT INTO schedules (
      id, user_id, title, start_time, end_time,
      latitude, longitude, address, place_id,
      move_type, move_duration,
      walk_duration, transit_duration, drive_duration,
      is_recurring, source, color
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
     RETURNING *`,
    [
      id, user_id, title, start_time, end_time,
      latitude, longitude, address, place_id,
      move_type, move_duration,
      walk_duration, transit_duration, drive_duration,
      is_recurring, source, color
    ]
  );

  return result.rows[0];
};

// 일정 삭제
exports.deleteSchedule = async (id) => {
  console.log("🧨 DB에서 삭제 시도 중:", id);
  await db.query("DELETE FROM schedules WHERE id = $1", [id]);
  console.log("✅ DB 삭제 완료");
};

// 일정 수정
exports.updateSchedule = async (id, data) => {
  const fields = [];
  const values = [];
  let idx = 1;

  for (const key in data) {
    fields.push(`${key} = $${idx}`);
    values.push(data[key]);
    idx++;
  }

  values.push(id);
  const query = `UPDATE schedules SET ${fields.join(", ")} WHERE id = $${idx}`;
  await db.query(query, values);
};

// 이번 주 월요일 구하기
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

// 날짜 + n일
function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// 중복 일정 체크
async function checkIfAlreadyExists(userId, startTime) {
  const result = await db.query(
    `SELECT id FROM schedules 
     WHERE user_id = $1 AND start_time = $2`,
    [userId, startTime]
  );
  return result.rows.length > 0;
}

// 일정 하나를 기준으로 4주치 복사 (일정 추가 시 사용)
exports.generateRecurringForSchedule = async (schedule) => {
  const {
    user_id,
    title,
    start_time,
    end_time,
    latitude,
    longitude,
    address,
    place_id,
    move_type,
    move_duration,
    walk_duration,
    transit_duration,
    drive_duration,
    source
  } = schedule;

  for (const weekOffset of [7, 14, 21, 28]) {
    const newStart = new Date(start_time);
    const newEnd = new Date(end_time);
    newStart.setDate(newStart.getDate() + weekOffset);
    newEnd.setDate(newEnd.getDate() + weekOffset);

    const exists = await checkIfAlreadyExists(user_id, newStart);
    if (exists) continue;

    await db.query(
      `INSERT INTO schedules (
        id, user_id, title, start_time, end_time,
        latitude, longitude, address, place_id,
        move_type, move_duration,
        walk_duration, transit_duration, drive_duration,
        is_recurring, source
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,true,$15)`,
      [
        uuidv4(),
        user_id,
        title,
        newStart,
        newEnd,
        latitude,
        longitude,
        address,
        place_id,
        move_type,
        move_duration,
        walk_duration,
        transit_duration,
        drive_duration,
        source || "manual"
      ]
    );
  }
};


// 한 달 반복 일정 복사 (4주간 생성)
exports.generateMonthRecurringSchedules = async () => {
  const today = new Date();
  const thisMonday = getMonday(today);         
  const nextMonday = addDays(thisMonday, 7);  

  const result = await db.query(
    `SELECT * FROM schedules
     WHERE is_recurring = true
       AND start_time >= $1 AND start_time < $2`,
    [thisMonday, nextMonday]
  );

  const schedules = result.rows;
  let copied = 0;

  for (const sched of schedules) {
    const {
      user_id,
      title,
      start_time,
      end_time,
      latitude,
      longitude,
      address,
      place_id,
      move_type,
      move_duration,
      walk_duration,
      transit_duration,
      drive_duration,
      source
    } = sched;
    for (const weekOffset of [7, 14, 21, 28]) {
      const newStart = new Date(start_time);
      const newEnd = new Date(end_time);
      newStart.setDate(newStart.getDate() + weekOffset);
      newEnd.setDate(newEnd.getDate() + weekOffset);

      const exists = await checkIfAlreadyExists(user_id, newStart);
      if (exists) continue;

      await db.query(
        `
        INSERT INTO schedules (
          id, user_id, title, start_time, end_time,
          latitude, longitude, address, place_id,
          move_type, move_duration,
          walk_duration, transit_duration, drive_duration,
          is_recurring, source
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,true,$15)
        `,
        [
          uuidv4(),
          user_id,
          title,
          newStart,
          newEnd,
          latitude,
          longitude,
          address,
          place_id,
          move_type,
          move_duration,
          walk_duration,
          transit_duration,
          drive_duration,
          source || "manual"
        ]
      );

      copied++;
    }
  }

  return {
    message: `✅ ${copied}개의 반복 일정이 한 달 치로 생성되었습니다.`,
  };
};

exports.createAutoSchedule = async ({ user_id, time, place, source = "recommendation", color = null }) => {
  const fromQuery = await db.query(
    `SELECT address FROM schedules 
     WHERE user_id = $1 AND end_time < $2 
     ORDER BY end_time DESC 
     LIMIT 1`,
    [user_id, time]
  );

  const from = fromQuery.rows[0]?.address || "서울 성동구";

  const durations = await getDurations({
    from,
    target: {
      latitude: place.latitude,
      longitude: place.longitude,
    }
  });

  const durationMap = {
    walking: durations.walk,
    driving: durations.drive,
    transit: durations.transit
  };

  let shortestType = "walking";
  let shortestDuration = durations.walk;
  for (const [type, dur] of Object.entries(durationMap)) {
    if (dur !== null && dur < shortestDuration) {
      shortestType = type;
      shortestDuration = dur;
    }
  }

  const start_time = new Date(time);
  const end_time = new Date(start_time.getTime() + 60 * 60 * 1000);

  const insertResult = await db.query(
    `INSERT INTO schedules (
      id, user_id, title, start_time, end_time,
      latitude, longitude, address,
      move_type, move_duration,
      walk_duration, transit_duration, drive_duration,
      is_recurring, source, color, place_id
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
     RETURNING *`,
    [
      uuidv4(),
      user_id,
      place.title,
      start_time,
      end_time,
      place.latitude,
      place.longitude,
      place.location,
      shortestType,
      shortestDuration,
      durations.walk,
      durations.transit,
      durations.drive,
      false,
      source,
      color,
      place.id
    ]
  );

  return insertResult.rows[0]; 
};

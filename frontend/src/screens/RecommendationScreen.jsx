import React, { useState, useEffect, forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMapPin, FiClock } from "react-icons/fi";
import CancelTopBar from "../components/CancelTopBar";
import ColorPicker from "../components/ColorPicker";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

import { addPlace } from "../api/place";
import { autoCreateRecommendedSchedule } from "../api/recommendation";

const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <input
    ref={ref}
    value={value}
    onClick={onClick}
    readOnly
    placeholder="날짜 선택"
    style={styles.input}
  />
));
CustomDateInput.displayName = "CustomDateInput";

const CustomTimeInput = forwardRef(({ value, onClick }, ref) => (
  <div style={{ flex: 1 }}>
    <input
      ref={ref}
      value={value}
      onClick={onClick}
      readOnly
      placeholder="--:--"
      style={styles.input}
    />
  </div>
));
CustomTimeInput.displayName = "CustomTimeInput";

const RecommendationScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSlot = location.state?.selectedSlot;

  const [selectedDate, setSelectedDate] = useState(selectedSlot?.start || new Date());
  const [startTime, setStartTime] = useState(selectedSlot?.start || new Date());
  const [endTime, setEndTime] = useState(selectedSlot?.end || new Date(Date.now() + 3600000));

  const [placeData, setPlaceData] = useState(null);
  const [scheduleData, setScheduleData] = useState(null); // 🔹 추가
  const [loading, setLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#ebe6b6");

  const [moveType, setMoveType] = useState("walking");
  const [moveDuration, setMoveDuration] = useState(null);

  const minTime = new Date();
  minTime.setHours(0, 0);
  const maxTime = new Date();
  maxTime.setHours(23, 59);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchRecommendation = async () => {
      setLoading(true);
      try {
        const user_id = "b4f6282a-c186-4f11-a730-a96b574ab517"; // TODO: 실제 로그인 유저 ID로 교체
        const timeISO = selectedDate.toISOString();

        const result = await autoCreateRecommendedSchedule(user_id, timeISO, selectedColor);
        console.log("추천 일정 API 결과:", result);

        const place = result.place;
        const schedule = result.schedule;

        if (place && schedule) {
          setPlaceData({
            id: result.placeId,
            name: place.name,
            address: place.address,
            description: place.description,
            latitude: place.latitude,
            longitude: place.longitude,
            category: place.category,
            hours: place.hours,
            walk_duration: schedule.walk_duration,
            transit_duration: schedule.transit_duration,
            drive_duration: schedule.drive_duration,
          });

          setScheduleData(schedule); // 🔹 저장
          setStartTime(new Date(schedule.start_time));
          setEndTime(new Date(schedule.end_time));
          setMoveType(schedule.move_type || "walking");
          setMoveDuration(schedule.move_duration || null);
        }
      } catch (error) {
        console.error("추천 일정 생성 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [selectedDate]);

  const onMoveTypeClick = (type) => {
    setMoveType(type);
    if (!placeData) {
      setMoveDuration(null);
      return;
    }

    let duration = {
      walking: placeData.walk_duration,
      transit: placeData.transit_duration,
      driving: placeData.drive_duration,
    }[type];

    if (typeof duration !== "number" || isNaN(duration)) {
      duration = null;
    }

    setMoveDuration(duration);
  };

  const handleDone = async () => {
    if (!placeData || !scheduleData) return;

    try {
    
      const newEvent = {
        id: scheduleData.id,                // ✅ 정확한 schedule ID
        place_id: placeData.id,   // ✅ place ID
        title: placeData.name,
        start: startTime,
        end: endTime,
        place: placeData.address,
        color: selectedColor,
        description: scheduleData.description,     
        openingHours: scheduleData.opening_hours || "영업시간 정보 없음",
        estimatedMoveDuration: moveDuration,
        moveType,
        isRecommended: true,
      };

      navigate("/timelineview", { state: { newEvent } });
    } catch (err) {
      console.error("🛑 장소 저장 또는 일정 생성 실패:", err);
    }
  };

  const estimatedStart = startTime;
  const estimatedEnd = moveDuration
    ? new Date(estimatedStart.getTime() + moveDuration * 60 * 1000)
    : null;

  return (
    <div style={styles.container}>
      <CancelTopBar />
      <div style={styles.content}>
        <div style={styles.formWrapper}>
          {loading ? (
            <p>추천 장소를 불러오는 중입니다...</p>
          ) : placeData ? (
            <>
              <div style={styles.inputGroup}>
                <div style={styles.inputWithIcon}>
                  <ColorPicker selectedColor={selectedColor} onChange={setSelectedColor} />
                  <strong style={styles.placeName}>{placeData.name}</strong>
                </div>
                <span style={styles.introLabel}>한 줄 소개</span>
                <p style={styles.description}>{placeData.description}</p>
              </div>

              <div style={styles.divider} />

              <div style={styles.inputGroup}>
                <div style={styles.inputWithIcon}>
                  <FiMapPin style={styles.icon} />
                  <input
                    type="text"
                    value={placeData.address}
                    readOnly
                    placeholder="장소명을 입력하세요"
                    style={styles.input}
                  />
                </div>
                <div style={{ ...styles.subtext, marginLeft: "28px" }}>
                  영업시간: {placeData.hours || "정보 없음"}
                </div>
                <div style={{ ...styles.buttonRow, justifyContent: "center" }}>
                  {["walking", "transit", "driving"].map((type) => (
                    <button
                      key={type}
                      style={moveType === type ? styles.selectedtagButton : styles.tagButton}
                      onClick={() => onMoveTypeClick(type)}
                    >
                      {type === "walking" ? "도보" : type === "transit" ? "대중교통" : "자차"}
                    </button>
                  ))}
                </div>
                <div style={{ ...styles.subtext, textAlign: "center" }}>
                  {moveDuration != null ? `약 ${Math.round(moveDuration)}분 소요` : "이동시간 정보 없음"}
                </div>
              </div>

              <div style={styles.divider} />

              <div style={styles.inputGroup}>
                <div style={styles.inputWithIcon}>
                  <FiClock style={styles.icon} />
                  <DatePicker
                    selected={selectedDate}
                    onChange={setSelectedDate}
                    dateFormat="yyyy년 MM월 dd일 EEEE"
                    locale={ko}
                    customInput={<CustomDateInput />}
                  />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <span style={styles.label}>예상 이동 시간</span>
                <div style={styles.inputWithIcon}>
                  <span style={styles.timeBox}>
                    {estimatedStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
                  </span>
                  <span>-</span>
                  <span style={styles.timeBox}>
                    {estimatedEnd
                      ? estimatedEnd.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })
                      : "--:--"}
                  </span>
                </div>
              </div>

              <div style={styles.inputGroup}>
                <span style={styles.label}>일정 진행 시간</span>
                <div style={styles.timeRowJustified}>
                  <DatePicker
                    selected={startTime}
                    onChange={setStartTime}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    minTime={minTime}
                    maxTime={maxTime}
                    timeCaption="시작"
                    dateFormat="HH:mm"
                    locale={ko}
                    customInput={<CustomTimeInput />}
                  />
                  <span>-</span>
                  <DatePicker
                    selected={endTime}
                    onChange={setEndTime}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    minTime={minTime}
                    maxTime={maxTime}
                    timeCaption="종료"
                    dateFormat="HH:mm"
                    locale={ko}
                    customInput={<CustomTimeInput />}
                  />
                </div>
              </div>
            </>
          ) : (
            <p>추천 장소 정보가 없습니다.</p>
          )}
        </div>

        <div style={styles.bottomWrapper}>
          <button style={styles.doneBtn} onClick={handleDone} disabled={loading}>
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    overflow: "hidden",
    position: "relative",
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    paddingTop: "65px",
    alignItems: "center",
  },
  formWrapper: {
    width: "100%",
    maxWidth: "600px",
    padding: "0 5vw",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    flexGrow: 1,
    boxSizing: "border-box",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  inputWithIcon: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    fontSize: "18px",
    color: "#555",
  },
  input: {
    flex: 1,
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  placeName: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  introLabel: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#222",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "0px",
    marginTop: "-4px",
  },
  subtext: {
    fontSize: "13px",
    color: "#888",
  },
  tagButton: {
    padding: "6px 12px",
    backgroundColor: "transparent",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  selectedtagButton: {
    padding: "6px 12px",
    backgroundColor: "transparent",
    border: "2px solid #000",
    fontSize: "14px",
  },
  buttonRow: {
    display: "flex",
    gap: "50px",
    flexWrap: "wrap",
  },
  timeBox: {
    padding: "12px",
    backgroundColor: "transparent",
    borderRadius: "20px",
    minWidth: "82px",
    textAlign: "center",
    fontSize: "16px",
    fontWeight: "bold",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
  },
  timeRowJustified: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  divider: {
    borderBottom: "1px solid #ddd",
    margin: "4px 0",
  },
  bottomWrapper: {
    width: "100%",
    maxWidth: "600px",
    padding: "0 5vw 20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  doneBtn: {
    flex: 1,
    padding: "14px",
    backgroundColor: "#56c8d8",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    fontSize: "16px",
    cursor: "pointer",
    boxSizing: "border-box",
  },
};

export default RecommendationScreen;

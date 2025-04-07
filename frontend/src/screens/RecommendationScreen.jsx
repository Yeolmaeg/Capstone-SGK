import React, { useState, forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMapPin, FiClock } from "react-icons/fi";
import CancelTopBar from "../components/CancelTopBar";
import ColorPicker from "../components/ColorPicker";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

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

  const [selectedColor, setSelectedColor] = useState("#ebe6b6");
  const [place, setPlace] = useState("서울 서대문구 연세로4길 38");
  const [selectedDate, setSelectedDate] = useState(selectedSlot?.start || new Date());
  const [startTime, setStartTime] = useState(selectedSlot?.start || new Date());
  const [endTime, setEndTime] = useState(selectedSlot?.end || new Date(Date.now() + 3600000));

  const minTime = new Date();
  minTime.setHours(6, 0);
  const maxTime = new Date();
  maxTime.setHours(23, 0);

  const estimatedStart = selectedSlot?.start ? new Date(selectedSlot.start) : null;
  const estimatedEnd = estimatedStart ? new Date(estimatedStart.getTime() + 4 * 60000) : null;

  const handleDone = () => {
    const newEvent = {
      title: "클로리스 신촌",
      start: startTime,
      end: endTime,
      place,
      color: selectedColor,
      description: "클로리스 신촌점은 유럽의 티 문화를 현대적으로 재해석한 고풍스러운 분위기의 홍차 전문 카페로, 다양한 밀크티와 디저트를 제공합니다.",
      openingHours: "월~토 11:00~23:00 / 일 13:00~23:00",
      estimatedTime: {
        start: estimatedStart,
        end: estimatedEnd,
      },
      isRecommended: true,
    };
    navigate("/timelineview", { state: { newEvent } });
  };

  return (
    <div style={styles.container}>
      <CancelTopBar />
      <div style={styles.content}>
        <div style={styles.formWrapper}>
          <div style={styles.inputGroup}>
            <div style={styles.inputWithIcon}>
              <ColorPicker selectedColor={selectedColor} onChange={setSelectedColor} />
              <strong style={styles.placeName}>클로리스 신촌</strong>
            </div>
            <span style={styles.introLabel}>한 줄 소개</span>
            <p style={styles.description}>
              클로리스 신촌점은 유럽의 티 문화를 현대적으로 재해석한 고풍스러운 분위기의 홍차 전문 카페로, 다양한 밀크티와 디저트를 제공합니다.
            </p>
          </div>

          <div style={styles.divider} />

          <div style={styles.inputGroup}>
            <div style={styles.inputWithIcon}>
              <FiMapPin style={styles.icon} />
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="장소명을 입력하세요"
                style={styles.input}
              />
            </div>
            <div style={{ ...styles.subtext, marginLeft: "28px" }}>
              영업시간: 월~토 11:00~23:00 / 일 13:00~23:00
            </div>
            <div style={{ ...styles.buttonRow, justifyContent: "center" }}>
              <button style={styles.tagButton}>도보</button>
              <button style={styles.tagButton}>대중교통</button>
              <button style={styles.tagButton}>자차</button>
            </div>
            <div style={{ ...styles.subtext, textAlign: "center" }}>약 4분 소요</div>
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
                {estimatedStart ? estimatedStart.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : "--:--"}
              </span>
              <span>-</span>
              <span style={styles.timeBox}>
                {estimatedEnd ? estimatedEnd.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : "--:--"}
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
        </div>

        <div style={styles.bottomWrapper}>
          <button style={styles.doneBtn} onClick={handleDone}>추가</button>
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
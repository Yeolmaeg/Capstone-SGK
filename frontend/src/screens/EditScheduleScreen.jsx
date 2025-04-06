import React, { useState, useEffect, forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMapPin, FiClock } from "react-icons/fi";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import CancelTopBar from "../components/CancelTopBar";
import ColorPicker from "../components/ColorPicker";

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

const EditScheduleScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const originalEvent = location.state?.event;

  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ebe6b6");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(Date.now() + 3600000));

  useEffect(() => {
    if (!originalEvent) {
      navigate("/timelineview", { replace: true });
      return;
    }

    const start = new Date(originalEvent.start);
    const end = new Date(originalEvent.end);

    setTitle(originalEvent.title || "");
    setPlace(originalEvent.place || "");
    setSelectedColor(originalEvent.color || "#ebe6b6");
    setSelectedDate(start);
    setStartTime(start);
    setEndTime(end);
  }, [originalEvent, navigate]);

  const handleSave = () => {
    const updatedEvent = {
      ...originalEvent,
      title,
      place,
      color: selectedColor,
      start: new Date(startTime),
      end: new Date(endTime),
    };

    const stored = localStorage.getItem("savedEvents");
    const events = stored ? JSON.parse(stored) : [];

    const updatedEvents = events.map((e) =>
      e.title === originalEvent.title &&
      new Date(e.start).getTime() === new Date(originalEvent.start).getTime() &&
      new Date(e.end).getTime() === new Date(originalEvent.end).getTime()
        ? updatedEvent
        : e
    );

    localStorage.setItem("savedEvents", JSON.stringify(updatedEvents));

    navigate("/timelineview", { state: { updatedEvent } });
  };

  if (!originalEvent) return null;

  const minTime = new Date();
  minTime.setHours(6, 0);
  const maxTime = new Date();
  maxTime.setHours(23, 0);

  return (
    <div style={styles.container}>
      <CancelTopBar />
      <div style={styles.content}>
        <div style={styles.formWrapper}>
          {/* 일정명 */}
          <div style={styles.inputGroup}>
            <div style={styles.inputWithIcon}>
              <ColorPicker selectedColor={selectedColor} onChange={setSelectedColor} />
              <input
                type="text"
                placeholder="일정명"
                style={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div style={styles.divider} />
          </div>

          {/* 장소 */}
          <div style={styles.inputGroup}>
            <div style={styles.inputWithIcon}>
              <FiMapPin style={styles.icon} />
              <input
                type="text"
                placeholder="장소를 입력해주세요."
                style={styles.input}
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
            <div style={styles.divider} />
          </div>

          {/* 날짜 */}
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

          {/* 시간 */}
          <div style={styles.inputGroup}>
            <div style={styles.timeRow}>
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
          <button style={styles.doneBtn} onClick={handleSave}>
            완료
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
  bottomWrapper: {
    width: "100%",
    maxWidth: "600px",
    padding: "0 5vw 20px",
    boxSizing: "border-box",
  },
  inputGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    position: "relative",
  },
  inputWithIcon: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    flex: 1,
    minWidth: 0,
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
  divider: {
    borderBottom: "1px solid #ddd",
    marginTop: "6px",
  },
  timeRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    width: "100%",
    flexWrap: "nowrap",
  },
  doneBtn: {
    width: "100%",
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

export default EditScheduleScreen;

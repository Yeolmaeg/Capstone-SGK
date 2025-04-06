// AddScheduleScreen.jsx
import React, { useState, forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
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
CustomDateInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

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
CustomTimeInput.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

const AddScheduleScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const slot = location.state?.selectedSlot;

  const [selectedColor, setSelectedColor] = useState("#ebe6b6");
  const [selectedDate, setSelectedDate] = useState(slot?.start || new Date());
  const [startTime, setStartTime] = useState(slot?.start || new Date());
  const [endTime, setEndTime] = useState(slot?.end || new Date(Date.now() + 3600000));
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");

  const minTime = new Date();
  minTime.setHours(6, 0);
  const maxTime = new Date();
  maxTime.setHours(23, 0);

  const handleDone = () => {
    const newEvent = {
      title: title || "제목 없음",
      start: new Date(startTime),
      end: new Date(endTime),
      color: selectedColor,
      place,
    };

    navigate("/timelineview", { state: { newEvent } });
  };

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
          <button style={styles.doneBtn} onClick={handleDone}>
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

export default AddScheduleScreen;

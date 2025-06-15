// AddScheduleScreen.jsx
import React, { useState, useEffect, forwardRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FiMapPin, FiClock } from "react-icons/fi";
import CancelTopBar from "../components/CancelTopBar";
import ColorPicker from "../components/ColorPicker";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import { addSchedule } from "../api/schedule";

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

  // 선택된 날짜 (YYYY-MM-DD 등 순수 날짜용)
  const [selectedDate, setSelectedDate] = useState(slot?.start || new Date());

  // 선택된 시간: 시작, 종료 (시간만 사용)
  // 초기값은 slot?.start, slot?.end 의 시간부분만 추출해서 날짜는 오늘로 초기화
  const extractTimeOnly = (date) => {
    if (!date) return null;
    const d = new Date(date);
    return new Date(1970, 0, 1, d.getHours(), d.getMinutes());
  };

  const [startTime, setStartTime] = useState(extractTimeOnly(slot?.start) || new Date(1970, 0, 1, 9, 0));
  const [endTime, setEndTime] = useState(extractTimeOnly(slot?.end) || new Date(1970, 0, 1, 10, 0));

  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#ebe6b6");

  const minTime = new Date();
  minTime.setHours(0, 0);
  const maxTime = new Date();
  maxTime.setHours(23, 59);

  // location.state 업데이트 반영
  useEffect(() => {
    if (location.state?.selectedPlace) setPlace(location.state.selectedPlace);
    if (location.state?.selectedTitle) setTitle(location.state.selectedTitle);
    if (location.state?.selectedColor) setSelectedColor(location.state.selectedColor);

    // 시간은 시간만 뽑아서 set (1970년 1월 1일 기준)
    if (location.state?.selectedStartTime) setStartTime(extractTimeOnly(location.state.selectedStartTime));
    if (location.state?.selectedEndTime) setEndTime(extractTimeOnly(location.state.selectedEndTime));
    if (location.state?.selectedDate) setSelectedDate(new Date(location.state.selectedDate));
    if (location.state?.latitude) setLatitude(location.state.latitude);
    if (location.state?.longitude) setLongitude(location.state.longitude);
  }, [location.state]);

  // selectedDate(날짜)와 startTime, endTime(시간) 합쳐서 정확한 Date 객체 생성 (한국시간 기준)
  const combineDateAndTime = (date, time) => {
    if (!date || !time) return null;
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    combined.setMilliseconds(0);
    return combined;
  };

  const handleDone = async () => {
    const startDateTime = combineDateAndTime(selectedDate, startTime);
    const endDateTime = combineDateAndTime(selectedDate, endTime);

    if (!startDateTime || !endDateTime) {
    
      return;
    }

    if (endDateTime <= startDateTime) {
      alert("종료 시간이 시작 시간보다 빠를 수 없습니다.");
      return;
    }

    console.log("✅ handleDone() 호출됨");

    try {
      const scheduleData = {
        user_id: localStorage.getItem("user_id"),
        title: title || "제목 없음",
        start_time: startDateTime.toISOString(), // UTC ISO string (백엔드 호환)
        end_time: endDateTime.toISOString(),
        address: place,
        latitude: latitude,  // 좌표 예시
        longitude: longitude,
        is_recurring: false,
        color: selectedColor,
      };

      const response = await addSchedule(scheduleData);

      const newEvent = {
        id: response.id,
        title: scheduleData.title,
        start: startDateTime,  // 화면에 보여줄 땐 현지시간 Date 객체
        end: endDateTime,
        place: scheduleData.address,
        color: selectedColor,
      };
      console.log("✅ newEvent 전달됨:", newEvent);
      navigate("/timelineview", { state: { newEvent } });
    } catch (err) {
      console.error("❌ 일정 추가 실패:", err);
    }
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
                readOnly
                onClick={() =>
                  navigate("/selectlocation", {
                    state: {
                      returnTo: "/addschedule",
                      selectedTitle: title,
                      selectedColor: selectedColor,
                      selectedStartTime: startTime,
                      selectedEndTime: endTime,
                      selectedDate: selectedDate,
                      selectedSlot: slot,
                    },
                  })
                }
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

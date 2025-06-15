import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BottomBar from "../components/BottomBar";

const DateSelectionScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lectures } = location.state || {};
  const [startDate, setStartDate] = useState(null); // 개강일 상태
  const [endDate, setEndDate] = useState(null); // 종강일 상태

  const handleComplete = async () => {
    if (!startDate || !endDate) {
      alert("개강일과 종강일을 모두 선택해주세요.");
      return;
    }

    // ✅ ScanningScreen으로 넘어가서 거기서 일정 생성
    navigate("/scanning", {
      state: {
        lectures,
        startDate,
        endDate,
      },
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title1}>개강일을 선택해주세요.</h1>
      <div style={styles.datePickerContainer}>
        <div style={styles.datePickerWrapper}>
          <span style={styles.calendarIcon}>📅</span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="개강일을 입력해주세요."
            showPopperArrow={false}
            customInput={<input style={styles.customInput} />}
          />
        </div>
      </div>

      <hr style={styles.separator} />

      <h1 style={styles.title2}>종강일을 선택해주세요.</h1>
      <div style={styles.datePickerContainer}>
        <div style={styles.datePickerWrapper}>
          <span style={styles.calendarIcon}>📅</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy/MM/dd"
            placeholderText="종강일을 입력해주세요."
            showPopperArrow={false}
            customInput={<input style={styles.customInput} />}
          />
        </div>
      </div>

      <button style={styles.button} onClick={handleComplete}>
        완료
      </button>
    </div>
  );
};

// 스타일 객체
const styles = {
  container: {
    width: "100vw",
    height: "100vh", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between", 
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  title1: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#222",
    marginTop: "100px",
    marginBottom: "10px", // 제목과 다른 요소들 사이의 간격을 좁힘
    textAlign: "center",
  },
  title2: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "10px", // 제목과 다른 요소들 사이의 간격을 좁힘
    textAlign: "center",
  },
  datePickerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: "15px",
    marginBottom: "30%",  // 개강일과 종강일 사이의 여백 추가
  },
  datePickerWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "8px 10px",
    width: "100%",
    maxWidth: "300px",  // 최대 너비를 300px로 조정
  },
  datePicker: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
  },
  calendarIcon: { 
    marginRight: "8px",
    fontSize: "16px",
    color: "#888",
  },
  customInput: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
  },
  button: {
    width: "85px",
    padding: "10px",
    backgroundColor: "#56c8d8",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "20vh",
  },
  separator: {
    width: "80%",
    borderTop: "1px solid #ddd",  // 구분선 색상
    margin: "20px 0",  // 구분선 상하 여백
  },
};

export default DateSelectionScreen;
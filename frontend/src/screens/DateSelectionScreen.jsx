import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import BottomBar from "../components/BottomBar";

const DateSelectionScreen = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null); // 개강일 상태
  const [endDate, setEndDate] = useState(null); // 종강일 상태

  // 완료 버튼 클릭 시 날짜가 모두 선택되었는지 확인하고 이동
  const handleComplete = () => {
    if (startDate && endDate) {
      navigate("/scanning");
    } else {
      alert("개강일과 종강일을 모두 선택해주세요.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title1}>개강일을 선택해주세요.</h1>
      <div style={styles.datePickerContainer}>
        <div style={styles.datePickerWrapper}>
          <span style={styles.calendarIcon}>📅</span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)} // 개강일 날짜 선택 시 상태 업데이트
            dateFormat="yyyy/MM/dd" // 날짜 형식
            placeholderText="개강일을 입력해주세요."
            showPopperArrow={false} // 화살표 없애기
            className="date-picker" // 커스터마이징용 클래스
            style={styles.datePicker} // 날짜 선택창 스타일링
            customInput={<input style={styles.customInput} />}
          />
        </div>
      </div>

      {/* 개강일과 종강일 사이에 구분선 추가 */}
      <hr style={styles.separator} />

      <h1 style={styles.title2}>종강일을 선택해주세요.</h1>
      <div style={styles.datePickerContainer}>
        <div style={styles.datePickerWrapper}>
          <span style={styles.calendarIcon}>📅</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)} // 종강일 날짜 선택 시 상태 업데이트
            dateFormat="yyyy/MM/dd"
            placeholderText="종강일을 입력해주세요."
            showPopperArrow={false}
            className="date-picker"
            style={styles.datePicker} // 날짜 선택창 스타일링
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
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",  // 부모 요소를 상단 정렬
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    position: "relative",
    overflow: "hidden",
  },
  title1: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#222",
    marginTop: "35px",
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
    marginBottom: "190px",  // 개강일과 종강일 사이의 여백 추가
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
  },
  separator: {
    width: "80%",
    borderTop: "1px solid #ddd",  // 구분선 색상
    margin: "20px 0",  // 구분선 상하 여백
  },
};

export default DateSelectionScreen;

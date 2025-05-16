import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { MdOutlineCalendarViewMonth } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TimelineTopBar = ({ selectedYear, selectedMonth, onMonthChange }) => {
  const navigate = useNavigate();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().set("year", selectedYear).set("month", selectedMonth - 1).toDate()
  );

  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const newYear = moment(date).year();
    const newMonth = moment(date).month() + 1;
    onMonthChange(moment(date).toDate());
    setDatePickerVisible(false); // 선택 후 닫기
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        event.stopPropagation();
        event.preventDefault();
        setDatePickerVisible(false);
      }
    };
  
    if (isDatePickerVisible) {
      document.addEventListener("mousedown", handleClickOutside, true); // capture 단계로 변경
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [isDatePickerVisible]);
  
  return (
    <div style={styles.topBar}>
      <span style={styles.logo}>Dayfull</span>

      <div
        style={styles.dateDisplay}
        onClick={() => setDatePickerVisible(!isDatePickerVisible)}
      >
        {selectedYear}년 {selectedMonth}월
        <IoIosArrowDown size={20} color="#56c8d8" style={styles.arrowIcon} />
      </div>

      {isDatePickerVisible && (
        <div style={styles.datePickerWrapper} ref={datePickerRef}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy년 MM월"
            showMonthYearPicker
            inline
            showPopperArrow={false}
            className="date-picker"
            style={styles.datePicker}
          />
        </div>
      )}

      <div style={styles.icons}>
        <span style={styles.icon} onClick={() => navigate("/calendarview")}>
          <MdOutlineCalendarViewMonth size="30" color="#56c8d8" />
        </span>
        <span style={styles.icon} onClick={() => navigate("/mypage")}>
          <RiAccountCircleLine size="30" color="#56c8d8" />
        </span>
      </div>
    </div>
  );
};

TimelineTopBar.propTypes = {
  selectedYear: PropTypes.number.isRequired,
  selectedMonth: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired,
};

const styles = {
  topBar: {
    width: "100vw",
    height: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 6px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#56c8d8",
    cursor: "pointer",
    marginLeft: "10px",
  },
  dateDisplay: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#56c8d8",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  arrowIcon: {
    marginLeft: "5px",
  },
  datePickerWrapper: {
    position: "absolute",
    top: "50px",
    left: "50%",
    transform: "translateX(-40%)",
    zIndex: 200,
    width: "80%",
  },
  datePicker: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    outline: "none",
  },
  icons: {
    display: "flex",
    gap: "10px",
    marginRight: "20px",
  },
  icon: {
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default TimelineTopBar;

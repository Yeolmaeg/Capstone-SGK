import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트

const AddTopBar = ( ) => {
  const navigate = useNavigate(); // navigate 함수 초기화

  return (
    <div style={styles.topBar}>
      <span style={styles.logo} onClick={() => navigate("/timelineview")}>
        Dayfull
      </span>
      <button style={styles.addBtn} onClick={() => navigate("/addaddress")}>
        추가
      </button>
    </div>
  );
};

AddTopBar.propTypes = {
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
    padding: "0 10px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    position: "absolute",
    top: 0,
    left: 0,
  },
  logo: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#56c8d8",
    cursor: "pointer",
    marginLeft: "10px",
  },
  addBtn: {
    background: "none",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
    cursor: "pointer",
    marginRight: "10px",
  },
};

export default AddTopBar;

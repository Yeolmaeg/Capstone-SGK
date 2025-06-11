import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 임포트

const EditTopBar = ({ onEdit }) => {
  const navigate = useNavigate(); // navigate 함수 초기화

  return (
    <div style={styles.topBar}>
      <span style={styles.logo} onClick={() => navigate("/timelineview")}>
        Dayfull
      </span>
      <button style={styles.editBtn} onClick={onEdit}>
        편집
      </button>
    </div>
  );
};

EditTopBar.propTypes = {
   onEdit: PropTypes.func.isRequired,  // ✅ 올바른 프로퍼티 설정
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
  editBtn: {
    background: "none",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
    cursor: "pointer",
    marginRight: "10px",
  },
};

export default EditTopBar;

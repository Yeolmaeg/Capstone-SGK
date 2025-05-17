import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DeleteTopBar = ({ onDelete }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.topBar}>
      <span style={styles.logo} onClick={() => navigate("/timelineview")}>
        Dayfull
      </span>
      <button style={styles.deleteBtn} onClick={onDelete}>
        삭제
      </button>
    </div>
  );
};

DeleteTopBar.propTypes = {
  onDelete: PropTypes.func.isRequired,
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
  },
  deleteBtn: {
    background: "none",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#000",
    cursor: "pointer",
  },
};

export default DeleteTopBar;

import React from "react";
import { useNavigate } from "react-router-dom";

const BottomBar = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.bottomBar}>
      <div style={styles.navIcon} onClick={() => navigate(-1)}>
        <div style={styles.line}></div>
        <div style={styles.line}></div>
        <div style={styles.line}></div>
      </div>
      <div style={styles.homeIcon} onClick={() => navigate("/")}></div>
      <div style={styles.backIcon} onClick={() => navigate(-1)}></div>
    </div>
  );
};

const styles = {
  bottomBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderTop: "1px solid #ccc",
    cursor: "pointer",
  },
  navIcon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "20px",
    height: "20px",
  },
  line: {
    width: "2px",
    height: "100%",
    backgroundColor: "#555",
    borderRadius: "2px",
  },
  homeIcon: {
    width: "15px",
    height: "15px",
    borderRadius: "35%",
    border: "2px solid #555",
    backgroundColor: "transparent",
  },
  backIcon: {
    width: "10px",
    height: "10px",
    borderTop: "2px solid #555",
    borderRight: "2px solid #555",
    transform: "rotate(225deg)",
    backgroundColor: "transparent",
  },
};

export default BottomBar;

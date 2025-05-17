import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScannedScreen = () => {
  const navigate = useNavigate();

  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/timelineview"); 
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>Dayfull</h1>
      <p style={styles.loadingText}>강의 일정 생성을 완료하였습니다!</p>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  logo: {
    fontSize: "50px",
    fontWeight: "bold",
    color: "#56c8d8",
    fontFamily: "'Arial', sans-serif",
    marginBottom: "20px",
  },
  loadingText: {
    fontSize: "14px",
    color: "#888", 
  },
};

export default ScannedScreen;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ScanningScreen = () => {
  const navigate = useNavigate();

  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/scanned"); 
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>Dayfull</h1>
      <p style={styles.loadingText}>시간표 스캔 중 ···</p>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
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

export default ScanningScreen;

import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateSchedulesFromLectures } from "../api/lectureSchedule";

const ScanningScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lectures, startDate, endDate } = location.state || {};

  
  useEffect(() => {
    const run = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const offset = 9 * 60 * 60 * 1000;

        startDate.setHours(9, 0, 0);
        endDate.setHours(9, 0, 0);

        const semesterStart = new Date(startDate.getTime() - offset).toISOString();
        const semesterEnd = new Date(endDate.getTime() - offset).toISOString();

        const schedules = await generateSchedulesFromLectures(
          userId,
          semesterStart,
          semesterEnd,
          lectures
        );

        navigate("/timelineview", { state: { schedules } });
      } catch (err) {
        console.error("일정 생성 실패:", err);
        alert("일정 생성 중 오류가 발생했습니다.");
        navigate("/dateselection");
      }
    };

    run();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.logo}>Dayfull</h1>
      <p style={styles.loadingText}>강의 일정 생성 중 ···</p>
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

export default ScanningScreen;

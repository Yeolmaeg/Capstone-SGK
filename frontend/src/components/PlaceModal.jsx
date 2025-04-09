import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { autoAddSchedule } from "../api/autoschedule"; 

const PlaceModal = ({ onClose }) => {
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!place.trim()) return;
    setLoading(true);

    try {
      const userId = "5012f198-ca58-42ca-afde-41e1459a4cef"; // 사용자 ID 하드코딩 예시
      const { schedule, place: placeInfo } = await autoAddSchedule(place, userId);

      const newEvent = {
        id: schedule.id,
        title: schedule.title,
        start: new Date(schedule.start_time),
        end: new Date(schedule.end_time),
        place: schedule.address,
        latitude: schedule.latitude,
        longitude: schedule.longitude,
        color: schedule.color || "#ebe6b6",
      };

      console.log("✅ 자동 일정 추가됨:", newEvent);
      onClose(); // 모달 닫고
      navigate("/timelineview", { state: { newEvent } }); // 일정 추가
    } catch (err) {
      alert("❌ 일정 생성에 실패했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setPlace(e.target.value);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <h1 style={styles.title}>어떤 장소를 방문하실 건가요?</h1>

        <div style={styles.searchContainer}>
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              style={styles.input}
              placeholder="장소명을 입력해주세요."
              value={place}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
        </div>

        <div style={styles.buttonGroup}>
          <button
            style={styles.submitButton}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "처리 중..." : "완료"}
          </button>
          <button
            style={styles.cancelButton}
            onClick={onClose}
            disabled={loading}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

// styles 그대로 유지
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    
  },
  container: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    width: "80%",
    maxWidth: "360px",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "16px",
    marginBottom: "16px",
  },
  searchContainer: {
    marginBottom: "16px",
  },
  searchBox: {
    position: "relative",
    width: "100%",
    margin: "0 auto",
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    fontSize: "16px",
    color: "#aaa",
  },
  input: {
    width: "85%",
    padding: "10px 10px 10px 36px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  cancelButton: {
    width: "25%",
    padding: "10px",
    backgroundColor: "#ccc",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  submitButton: {
    width: "25%",
    padding: "10px",
    backgroundColor: "#56c8d8",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default PlaceModal;

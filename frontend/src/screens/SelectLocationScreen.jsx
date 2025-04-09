import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DoneTopBar from "../components/DoneTopBar";
import { getPlaceInfo } from "../api/place"; 

const SelectLocationScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputName, setInputName] = useState("");
  const [loading, setLoading] = useState(false);

const handleDone = async () => {
  if (!inputName.trim()) return;

  try {
    setLoading(true);
    const result = await getPlaceInfo(inputName); // ✅ Perplexity API 호출
    console.log("🎯 최종 결과:", result);

    // 결과를 navigate로 넘겨줌
    navigate(location.state?.returnTo || "/addschedule", {
      state: {
        selectedPlace: result.location, // UI 입력값
        latitude: result.latitude,
        longitude: result.longitude,
        selectedTitle: location.state?.selectedTitle,
        selectedColor: location.state?.selectedColor,
        selectedStartTime: location.state?.selectedStartTime,
        selectedEndTime: location.state?.selectedEndTime,
        selectedDate: location.state?.selectedDate,
        selectedSlot: location.state?.selectedSlot,
        event: location.state?.event,
      },
    });
  } catch (err) {
    console.error("❌ 장소 정보 불러오기 실패:", err);
    alert("장소 정보를 불러오는 데 실패했습니다.");
  } finally {
    setLoading(false);
  }
};

return (
  <div style={styles.container}>
    <DoneTopBar onDone={handleDone} />
    <div style={styles.content}>
      <label style={styles.label}>일정 위치</label>
      <div style={styles.inputRow}>
        <label style={styles.inlineLabel}>위치:</label>
        <input
          type="text"
          placeholder="장소명을 입력해주세요."
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          style={styles.input}
        />
      </div>
      {loading && <p>장소 정보를 불러오는 중...</p>}
      <div style={styles.divider} />
    </div>
  </div>
);
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    fontFamily: "sans-serif",
  },
  content: {
    padding: "24px 16px",
    flex: 1,
    marginTop: "60px", // 상단바 공간 확보
  },
  label: {
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "16px",
  },
  inlineLabel: {
    fontSize: "16px",
    fontWeight: "normal",
    whiteSpace: "nowrap",
  },
  divider: {
    marginTop: "16px",
    height: "1px",
    backgroundColor: "#ddd",
  },
};

export default SelectLocationScreen;

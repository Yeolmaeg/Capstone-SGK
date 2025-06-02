import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMapPin, FiClock } from "react-icons/fi";
import DeleteTopBar from "../components/DeleteTopBar";
import { getPlaceById } from "../api/place";
import { deleteSchedule } from "../api/schedule";

const RecommendationDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(false);

 

  useEffect(() => {
    if (!event) {
      navigate("/timelineview", { replace: true });
      return;
    }
     
       const fetchPlaceDetails = async () => {
    try {
      if (!event.place_id) {
        console.warn("place_id 없음, 장소 정보 조회 생략");
        return;
      }

      const placeData = await getPlaceById(event.place_id);

      setEvent((prev) => ({
        ...prev,
        description: placeData.description || "설명 없음",
        openingHours: placeData.hours || "영업시간 정보 없음",
      }));
    } catch (error) {
      console.error("장소 정보 조회 실패:", error);
      setEvent((prev) => ({
        ...prev,
        description: prev.description || "설명 없음",
        openingHours: prev.openingHours || "영업시간 정보 없음",
      }));
    }
  };

  fetchPlaceDetails();
}, []);

  const handleEdit = () => {
    navigate("/editrecommendation", { state: { event } });
  };

  const handleDelete = async () => {
  try {
    await deleteSchedule(event.id); // 서버 삭제 완료 대기
    navigate("/timelineview", { replace: true, state: { deletedEvent: event } });
  } catch (error) {
    console.error("일정 삭제 실패:", error);
  }
};

if (!event) return null;


  const formattedDateTime = `${new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(new Date(event.start))} ${new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(event.start))} ~ ${new Intl.DateTimeFormat("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(event.end))}`;

  const estimatedTime = event.estimatedTime
    ? `${new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(event.estimatedTime.start))} ~ ${new Intl.DateTimeFormat("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(event.estimatedTime.end))}`
    : null;
          

  return (
    <div style={styles.container}>
      <DeleteTopBar onDelete={handleDelete} />
      <div style={styles.content}>
        <div style={styles.wrapper}>
          <div style={styles.itemRow}>
            <div style={{ ...styles.colorDot, backgroundColor: event.color || "#3174ad" }} />
            <span style={styles.text}>{event.title || "장소 이름 없음"}</span>
          </div>
          <div style={styles.label}>한 줄 소개</div>
          <span style={styles.text}>{event.description || "설명 없음"}</span>
          <div style={styles.divider} />

          <div style={styles.itemRow}>
            <FiMapPin style={styles.icon} />
            <span style={styles.text}>{event.address || "주소 정보 없음"}</span>
          </div>
          <div style={styles.subtext}>{event.openingHours || "영업시간 정보 없음"}</div>
          <div style={styles.divider} />

          <div style={styles.itemRow}>
            <FiClock style={styles.icon} />
            <span style={styles.text}>{formattedDateTime}</span>
          </div>            
          {estimatedTime && (
            <div style={{ ...styles.subtext, marginLeft: 28 }}>예상 이동 시간: {estimatedTime}</div>
          )}
        </div>

        <div style={styles.footer}>
          <button style={styles.editBtn} onClick={handleEdit}>
            편집
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = { 
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  content: {
    flexGrow: 1,
    paddingTop: "65px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  wrapper: {
    width: "100%",
    maxWidth: "600px",
    padding: "0 5vw",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxSizing: "border-box",
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  icon: {
    fontSize: "18px",
    color: "#555",
  },
  colorDot: {
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  text: {
    fontSize: "16px",
    color: "#333",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#444",
    marginLeft: "28px",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginLeft: "28px",
    whiteSpace: "pre-wrap",
  },
  subtext: {
    fontSize: "13px",
    color: "#888",
    marginLeft: "28px",
  },
  divider: {
    borderBottom: "1px solid #ddd",
  },
  footer: {
    width: "100%",
    maxWidth: "600px",
    padding: "0 5vw 20px",
    marginTop: "auto",
    boxSizing: "border-box",
  },
  editBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#56c8d8",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxSizing: "border-box",
  },
};

export default RecommendationDetailScreen;

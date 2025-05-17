import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMapPin, FiClock } from "react-icons/fi";
import DeleteTopBar from "../components/DeleteTopBar";
import { getPlaceInfo } from "../api/place";
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

    // description 또는 openingHours가 없으면 장소 상세 API 호출해서 보완
    if ((!event.description || !event.openingHours) && event.title) {
      setLoading(true);
      getPlaceInfo(event.title)
        .then((placeInfo) => {
          setEvent((prev) => ({
            ...prev,
            description: placeInfo.description || "설명 없음",
            openingHours: placeInfo.hours || "영업시간 정보 없음",
          }));
        })
        .catch(() => {
          // 실패 시 기본값 세팅 가능
          setEvent((prev) => ({
            ...prev,
            description: prev.description || "설명 없음",
            openingHours: prev.openingHours || "영업시간 정보 없음",
          }));
        })
        .finally(() => setLoading(false));
    }
}, [event, navigate]);

  const handleEdit = () => {
    navigate("/editrecommendation", { state: { event } });
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

   const handleDelete = async () => {
      try {
        // DB에서 삭제 요청 (event.id가 recommendation ID라고 가정)
        await deleteSchedule(event.id);

        // 삭제 후 화면 이동 및 상태 전달
        navigate("/timelineview", { state: { deletedEvent: event } });
      } catch (error) {
        console.error("추천 일정 삭제 실패:", error);
        alert("추천 일정 삭제 중 문제가 발생했습니다.");
      }
    };
          

  return (
    <div style={styles.container}>
      <DeleteTopBar onDelete={handleDelete} />
      <div style={styles.content}>
        <div style={styles.wrapper}>
          <div style={styles.itemRow}>
            <div style={{ ...styles.colorDot, backgroundColor: event.color || "#3174ad" }} />
            <span style={styles.text}>{event.title || "제목 없음"}</span>
          </div>
          <div style={styles.label}>한 줄 소개</div>
          <div style={styles.description}>{event.description}</div>
          <div style={styles.divider} />

          <div style={styles.itemRow}>
            <FiMapPin style={styles.icon} />
            <span style={styles.text}>{event.place || "장소 정보 없음"}</span>
          </div>
          <div style={styles.subtext}>영업시간: {event.openingHours}</div>
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

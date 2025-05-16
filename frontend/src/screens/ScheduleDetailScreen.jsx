import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMapPin, FiClock } from "react-icons/fi";
import DeleteTopBar from "../components/DeleteTopBar";
import { deleteSchedule } from "../api/schedule";

const ScheduleDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState(location.state?.event || null);

  useEffect(() => {
    if (!event) {
      navigate("/timelineview", { replace: true });
      return;
    }
    console.log("📦 전달받은 event:", event);
  }, [event, navigate]);

  const handleDelete = async () => {
    try {
      // ✅ DB에서 삭제 요청
      const res = await deleteSchedule(event.id);
      console.log("✅ DB에서 일정 삭제 성공:", res.data); // 여기! 응답 출력
  
      // ✅ 화면 이동
      navigate("/timelineview", { state: { deletedEvent: event } });
    } catch (error) {
      console.error("❌ 일정 삭제 실패:", error);
      alert("일정 삭제 중 문제가 발생했습니다.");
    }
  };

  const handleEdit = () => {
    navigate("/editschedule", {
      state: { event },
    });
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

  return (
    <div style={styles.container}>
      <DeleteTopBar title="일정 정보" onDelete={handleDelete} />
      <div style={styles.content}>
        <div style={styles.wrapper}>
          <div style={styles.itemRow}>
            <div style={{ ...styles.colorDot, backgroundColor: event.color || "#3174ad" }} />
            <span style={styles.text}>{event.title || "제목 없음"}</span>
          </div>
          <div style={styles.divider} />

          <div style={styles.itemRow}>
            <FiMapPin style={styles.icon} />
            <span style={styles.text}>{event.place || "장소 정보 없음"}</span>
          </div>
          <div style={styles.divider} />

          <div style={styles.itemRow}>
            <FiClock style={styles.icon} />
            <span style={styles.text}>{formattedDateTime}</span>
          </div>
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

export default ScheduleDetailScreen;

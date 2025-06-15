// FeedbackModal.jsx
import React from "react";
import PropTypes from "prop-types";
import { FiMapPin } from "react-icons/fi";
import { saveFeedback } from "../api/feedback";

const FeedbackModal = ({
  eventTitle,
  eventDescription,
  eventLocation,
  eventId,
  userId = "f42e283a-9e2c-491f-9e37-7eaa9389000c", // 임시 하드코딩
  onClose,
}) => {
  const handleFeedback = async (type) => {
    const isSatisfied = type === "like";
    try {
      await saveFeedback(userId, eventId, isSatisfied);
      console.log("✅ 피드백 저장 완료");
      onClose();
    } catch (err) {
      console.error("❌ 피드백 저장 실패:", err);
      onClose();
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={styles.container}
        onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
      >
        <h2 style={styles.title}>{`<${eventTitle}>에 대한 평가를 남겨주세요.`}</h2>

        <div style={styles.infoSection}>
          <p style={styles.infoLabel}>장소명:</p>
          <p style={styles.infoText}>{eventTitle}</p>
          
          <p style={styles.infoLabel}>한 줄 소개:</p>
          <p style={styles.infoText}>{eventDescription}</p>
          
          <p style={styles.infoLocation}>
            <FiMapPin style={styles.icon} />
            {eventLocation}
          </p>
        </div>
        <div style={styles.buttonGroup}>
          <button style={styles.likeButton} onClick={() => handleFeedback("like")}>
            👍
          </button>
          <button style={styles.dislikeButton} onClick={() => handleFeedback("dislike")}>
            👎
          </button>
        </div>
      </div>
    </div>
  );
};

FeedbackModal.propTypes = {
  eventTitle: PropTypes.string,
  eventDescription: PropTypes.string,
  eventLocation: PropTypes.string,
  eventId: PropTypes.string,        
  userId: PropTypes.string, 
  onClose: PropTypes.func.isRequired,
};

export default FeedbackModal;

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
    padding: "20px",
    borderRadius: "20px",
    width: "85%",
    maxWidth: "250px",
    textAlign: "left",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "16px",
    marginBottom: "16px",
    fontWeight: "bold",
    lineHeight: "1.4",
  },
  infoSection: {
    marginBottom: "16px",
  },
  infoLabel: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  infoText: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "12px",
    lineHeight: "1.4",
  },
  infoLocation: {
    fontSize: "14px",
    color: "#888",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "8px",
  },
  icon: {
    fontSize: "16px",
    color: "#888",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
  },
  likeButton: {
    fontSize: "24px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  dislikeButton: {
    fontSize: "24px",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
};

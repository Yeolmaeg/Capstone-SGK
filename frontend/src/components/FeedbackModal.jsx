// FeedbackModal.jsx
import React from "react";
import PropTypes from "prop-types";
import { FiMapPin } from "react-icons/fi";

const FeedbackModal = ({ 
  eventTitle = "빌로우 성수", 
  eventDescription = "노트북 사용이 자유롭고 조용한 분위기의 카페로 대학생들이 공부나 과제하기에 알맞은 공간입니다.", 
  eventLocation = "서울특별시 성동구 연무장길 9-1 1층",
  onClose,
}) => {
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
          <button style={styles.likeButton} onClick={() => onClose("like")}>
            👍
          </button>
          <button style={styles.dislikeButton} onClick={() => onClose("dislike")}>
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

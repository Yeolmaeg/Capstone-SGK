import React from "react";

const TimetableModal = ({ isOpen, onClose, onEdit }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img 
          src="/timetable.png" 
          alt="Timetable" 
          style={styles.timetableImage} 
        />
        <button onClick={onEdit} style={styles.editButton}>편집</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    width: "90%",
    maxWidth: "500px",
    textAlign: "center",
  },
  timetableImage: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  editButton: {
    backgroundColor: "#56c8d8",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default TimetableModal;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoneTopBar from "../components/DoneTopBar";

const MyPageEditScreen = () => {
  const navigate = useNavigate();

  // 🔄 Local Storage에서 초기값 로드 (일관된 키 사용)
  const [nickname, setNickname] = useState(() => localStorage.getItem("nickname") || "닉네임");
  const [school, setSchool] = useState(() => localStorage.getItem("university") || "이화여자대학교");
  const [studentId, setStudentId] = useState(() => localStorage.getItem("studentId") || "2371006");

  // ✅ 저장 함수 (Local Storage)
  const handleSave = () => {
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("university", school);
    localStorage.setItem("studentId", studentId);
    navigate("/mypage");
  };

  // 🔄 입력 필드 변경 시 Local Storage 동기화
  useEffect(() => {
    localStorage.setItem("nickname", nickname);
  }, [nickname]);

  useEffect(() => {
    localStorage.setItem("university", school);
  }, [school]);

  useEffect(() => {
    localStorage.setItem("studentId", studentId);
  }, [studentId]);

  return (
    <div style={styles.container}>
      <DoneTopBar onDone={handleSave} />
      <div style={styles.content}>
        <div style={styles.profileSection}>
          <div style={styles.profileImage} />
        </div>

        <div style={styles.infoSection}>
          <div style={styles.infoRow}>
            <span style={styles.label}>닉네임</span>
            <div style={styles.inputWrapper}>
              <input 
                type="text" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)} 
                style={styles.input} 
              />
              <button style={styles.clearButton} onClick={() => setNickname("")}>✕</button>
            </div>
          </div>
          <div style={styles.divider} />

          <div style={styles.infoRow}>
            <span style={styles.label}>학교</span>
            <div style={styles.inputWrapper}>
              <input 
                type="text" 
                value={school} 
                onChange={(e) => setSchool(e.target.value)} 
                style={styles.input} 
              />
              <button style={styles.clearButton} onClick={() => setSchool("")}>✕</button>
            </div>
          </div>
          <div style={styles.divider} />

          <div style={styles.infoRow}>
            <span style={styles.label}>학번</span>
            <div style={styles.inputWrapper}>
              <input 
                type="text" 
                value={studentId} 
                onChange={(e) => setStudentId(e.target.value)} 
                style={styles.input} 
              />
              <button style={styles.clearButton} onClick={() => setStudentId("")}>✕</button>
            </div>
          </div>
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
    alignItems: "center",
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  content: {
    marginTop: "80px",
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profileSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  profileImage: {
    width: "80px",
    height: "80px",
    backgroundColor: "#56c8d8",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    padding: "5px",
  },
  input: {
    flex: 1,
    border: "none",
    backgroundColor: "transparent",
    fontSize: "16px",
    outline: "none",
    marginLeft: "15px",
  },
  clearButton: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    marginLeft: "5px",
  },
  infoSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px",
  },
  label: {
    fontWeight: "bold",
    flexShrink: 0,
    marginRight: "10px",
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#ddd",
    margin: "5px 0",
  },
};

export default MyPageEditScreen;

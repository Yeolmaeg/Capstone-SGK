import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

const MyPageEditScreen = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("닉네임");
  const [id, setId] = useState("ewhain");
  const [school, setSchool] = useState("이화여자대학교");
  const [studentId, setStudentId] = useState("2371006");

  return (
    <div style={styles.container}>
      <TopBar title="Dayfull" buttonLabel="완료" onButtonClick={() => navigate("/mypage")} />
      <div style={styles.content}>
        <div style={styles.profileSection}>
          <div style={styles.profileImage} />
          <div style={styles.nicknameWrapper}>
            <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} style={styles.input} />
            <button style={styles.clearButton} onClick={() => setNickname("")}>✕</button>
          </div>
        </div>
        <div style={styles.infoSection}>
          <div style={styles.infoRow}>
            <span style={styles.label}>ID</span>
            <div style={styles.inputWrapper}>
              <input type="text" value={id} onChange={(e) => setId(e.target.value)} style={styles.input} />
              <button style={styles.clearButton} onClick={() => setId("")}>✕</button>
            </div>
          </div>
          <div style={styles.divider} />
          <div style={styles.infoRow}>
            <span style={styles.label}>학교</span>
            <div style={styles.inputWrapper}>
              <input type="text" value={school} onChange={(e) => setSchool(e.target.value)} style={styles.input} />
              <button style={styles.clearButton} onClick={() => setSchool("")}>✕</button>
            </div>
          </div>
          <div style={styles.divider} />
          <div style={styles.infoRow}>
            <span style={styles.label}>학번</span>
            <div style={styles.inputWrapper}>
              <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} style={styles.input} />
              <button style={styles.clearButton} onClick={() => setStudentId("")}>✕</button>
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

const styles = {
  container: {
    width: "360px",
    height: "800px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
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
  nicknameWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
  },
  input: {
    flex: 1,                                                                                                                
    border: "none",
    backgroundColor: "transparent",
    fontSize: "16px",
    outline: "none",
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

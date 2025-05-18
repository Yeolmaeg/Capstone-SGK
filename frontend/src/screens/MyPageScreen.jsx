import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditTopBar from "../components/EditTopBar";

const MyPageScreen = () => {
  const navigate = useNavigate();
  
  // 🔄 Local Storage에서 회원 정보 불러오기
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [nickname, setNickname] = useState("");
  const [university, setUniversity] = useState("");

  useEffect(() => {
    // 일관된 키 이름 사용 (회원가입에서 저장한 키)
    const storedEmail = localStorage.getItem("email") || "example@gmail.com";
    const storedStudentId = localStorage.getItem("studentId") || "2371006";
    const storedNickname = localStorage.getItem("nickname") || "닉네임";
    const storedUniversity = localStorage.getItem("university") || "이화여자대학교";

    setEmail(storedEmail);
    setStudentId(storedStudentId);
    setNickname(storedNickname);
    setUniversity(storedUniversity);
  }, []);

  const handleDone = () => {
    navigate("/editmypage");
  };

  return (
    <div style={styles.container}>
      <div style={styles.topBarContainer}>
        <EditTopBar onEdit={handleDone} />
      </div>
      <div style={styles.content}>
        <div style={styles.profileSection}>
          <div style={styles.profileImage} />
          <div style={styles.nickname}>{nickname}</div>
        </div>

        <div style={styles.infoSection}>
          <div style={styles.infoRow}>
            <span style={styles.boldText}>E-MAIL</span>
            <input type="text" value={email} readOnly style={styles.input} />
          </div>
          <div style={styles.divider} />
          
          <div style={styles.infoRow}>
            <span style={styles.boldText}>학교</span>
            <input type="text" value={university} readOnly style={styles.input} />
          </div>
          <div style={styles.divider} />
          
          <div style={styles.infoRow}>
            <span style={styles.boldText}>학번</span>
            <input type="text" value={studentId} readOnly style={styles.input} />
          </div>
          <div style={styles.divider} />
        </div>

        <div style={styles.menuSection}>
          <div style={styles.menuItem} onClick={() => navigate("/timetable-upload")}>
            <span style={styles.menuText}>시간표</span>
            <span style={styles.menuArrow}>➝</span>
          </div>
          <div style={styles.divider} />
          
          <div style={styles.menuItem} onClick={() => navigate("/addresslist")}>
            <span style={styles.menuText}>주소록</span>
            <span style={styles.menuArrow}>➝</span>
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
  topBarContainer: {
    width: "100%",
    position: "relative",
  },
  content: {
    marginTop: "100px", 
    width: "100%",
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
  },
  nickname: {
    marginTop: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  infoSection: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#ddd",
    margin: "5px 0",
  },
  input: {
    border: "none",
    backgroundColor: "transparent",
    textAlign: "right",
    width: "70%",
  },
  menuSection: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px 0",
  },
  menuText: {
    fontWeight: "bold",
    textAlign: "left",
  },
  menuArrow: {
    textAlign: "right",
  },
  boldText: {
    fontWeight: "bold",
  },
};

export default MyPageScreen;

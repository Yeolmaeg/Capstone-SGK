import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DoneTopBar from "../components/DoneTopBar";
import { getUserInfo, updateUserInfo } from "../api/user";

const MyPageEditScreen = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [school, setSchool] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem("user_id");
        const user = await getUserInfo(userId);

        setNickname(user.name || "");
        setSchool(user.school || "이화여자대학교");
        setStudentId(user.student_id || "");
      } catch (err) {
        console.error("❌ 사용자 정보 로드 실패:", err);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("user_id");
      await updateUserInfo(userId, {
        name: nickname,
      });

      alert("프로필이 수정되었습니다.");
      navigate("/mypage");
    } catch (err) {
      console.error("❌ 저장 실패:", err);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div style={styles.container}>
      <DoneTopBar onDone={handleSave} />
      <div style={styles.content}>
        <div style={styles.profileSection}>
          <div style={styles.profileImage} />
        </div>

        <div style={styles.infoSection}>
          {/* 닉네임 */}
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

          {/* 학교 (수정 불가) */}
          <div style={styles.infoRow}>
            <span style={styles.label}>학교</span>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={school}
                readOnly
                style={{ ...styles.input, color: "#999" }}
              />
            </div>
          </div>
          <div style={styles.divider} />

          {/* 학번 (수정 불가) */}
          <div style={styles.infoRow}>
            <span style={styles.label}>학번</span>
            <div style={styles.inputWrapper}>
              <input
                type="text"
                value={studentId}
                readOnly
                style={{ ...styles.input, color: "#999" }}
              />
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

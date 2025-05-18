import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignupScreen = () => {
  const navigate = useNavigate();

  // 🔄 초기 상태 설정 (LocalStorage에서 초기값 로드)
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [studentId, setStudentId] = useState("");

  // 🔄 페이지가 로드될 때 LocalStorage 초기화 (새로고침 시 초기화)
  useEffect(() => {
    setNickname("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setStudentId("");
  }, []);

  const handleSignup = () => {
    if (!nickname.trim() || !email.trim() || !password || !passwordConfirm || !studentId.trim()) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    // 🔄 LocalStorage에 최종 데이터 저장
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("studentId", studentId);


    // 메인 페이지로 이동 (필요 시 수정)
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dayfull</h1>


      <div style={styles.formGroup}>
        <label style={styles.label}>E-MAIL</label>
        <input
          type="email"
          style={styles.input}
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>PASSWORD</label>
        <input
          type="password"
          style={styles.input}
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>PASSWORD 확인</label>
        <input
          type="password"
          style={styles.input}
          placeholder="비밀번호를 다시 입력하세요"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>학번</label>
        <input
          type="text"
          style={styles.input}
          placeholder="학번을 입력하세요"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>닉네임</label>
        <input
          type="text"
          style={styles.input}
          placeholder="닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <button style={styles.signupButton} onClick={handleSignup}>
        회원가입
      </button>
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
    justifyContent: "center",
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
  },
  title: {
    fontSize: "50px",
    fontWeight: "bold",
    color: "#56c8d8",
    marginBottom: "40px",
  },
  formGroup: {
    width: "80%",
    maxWidth: "300px",
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "6px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  signupButton: {
    width: "80%",
    maxWidth: "300px",
    padding: "10px",
    backgroundColor: "#56c8d8",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginTop: "30px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default SignupScreen;

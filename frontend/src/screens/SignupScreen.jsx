import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

const SignupScreen = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleSignup = async () => {
    if (!nickname.trim() || !email.trim() || !password || !passwordConfirm || !studentId.trim()) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const res = await apiClient.post("/user/signup", {
        email,
        password,
        name: nickname,
        student_id: studentId,
        school: null,     // 예시: 고정값 or 학교 선택 페이지에서 받아오기
        school_id: null,          // 예시: 고정값 or 학교 리스트 선택에서 가져오기
        start_term: "2023-1",     // 예시: 추후 UI에서 선택하게 만들면 좋음
        end_term: "2027-2"
      });

      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/"); // 로그인 페이지로 이동
    } catch (err) {
      console.error("회원가입 실패", err);
      alert("회원가입 실패: 이미 존재하는 이메일이거나 서버 오류");
    }
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

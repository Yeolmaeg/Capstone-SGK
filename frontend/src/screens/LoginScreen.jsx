import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await apiClient.post("/user/login", { email, password });
      const { token, userId } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user_id", userId);

      navigate("/univ-select"); // 로그인 성공 후 이동
    } catch (err) {
      alert("로그인 실패: 이메일 또는 비밀번호 확인");
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dayfull</h1>

      <div style={styles.formGroup}>
        <label style={styles.label}>E-MAIL</label>
        <input
          type="text"
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

      <button style={styles.loginButton} onClick={handleLogin}>
        로그인
      </button>

      <button
        style={styles.signupButton}
        onClick={() => navigate("/signup")}
        type="button"
      >
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
    marginBottom: "6px", // input과 간격
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    boxSizing: "border-box",
  },
  loginButton: {
    width: "80%",
    maxWidth: "300px",
    padding: "10px",
    backgroundColor: "#56c8d8",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginTop: "20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  signupButton: {
    width: "80%",
    maxWidth: "300px",
    padding: "10px",
    backgroundColor: "transparent",
    color: "#56c8d8",
    border: "2px solid #56c8d8",
    borderRadius: "5px",
    marginTop: "20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default LoginScreen;

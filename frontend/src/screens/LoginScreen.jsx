import React from "react";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dayfull</h1>

      <div style={styles.formGroup}>
        <label style={styles.label}>E-MAIL</label>
        <input type="text" style={styles.input} placeholder="이메일을 입력하세요" />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>PASSWORD</label>
        <input type="password" style={styles.input} placeholder="비밀번호를 입력하세요" />
      </div>

      <button style={styles.loginButton} onClick={() => navigate("/univ-select")}>
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

import React from "react";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate(); 

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dayfull</h1>
      <label style={styles.label}>ID</label>
      <input type="text" style={styles.input} placeholder="Enter ID" />
      <label style={styles.label}>PASSWORD</label>
      <input type="password" style={styles.input} placeholder="Enter Password" />
      <button style={styles.button} onClick={() => navigate("/univ-select")}>
        로그인
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
  label: {
    alignSelf: "flex-start",
    marginLeft: "25px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginTop: "20px",
  },
  input: {
    width: "80%",
    maxWidth: "300px",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    width: "85px",
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
};

export default LoginScreen;

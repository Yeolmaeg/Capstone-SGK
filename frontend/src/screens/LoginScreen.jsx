import React from "react";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";

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
    justifyContent: "center",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
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

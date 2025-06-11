import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";
import TopBar from "../components/TopBar";

const EditAddressScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 📦 초기 주소값 설정
  const [name, setName] = useState("학교");
  const [address, setAddress] = useState("서울 서대문구 이화여대길 52");

  useEffect(() => {
    // 🗺️ 주소 데이터가 전달된 경우 초기화
    if (location.state && location.state.address) {
      const { label, address } = location.state.address;
      setName(label);
      setAddress(address);
    }
  }, [location.state]);

  const handleCancel = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleSave = () => {
  
    navigate("/addresslist");
  };

  return (
    <div style={styles.container}>
      <TopBar />
      <main style={styles.main}>
        <h2 style={styles.title}>주소록 수정</h2>

        <div style={styles.formRow}>
          <FiMapPin style={styles.icon} />
          <label htmlFor="nameInput" style={styles.label}>
            <b>이름 설정:</b>
          </label>
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder="이름을 입력하세요"
          />
        </div>

        <div style={{ ...styles.formRow, marginTop: 20 }}>
          <FiMapPin style={styles.icon} />
          <label style={styles.label}>
            <b>주소:</b>
          </label>
          <span style={styles.addressText}>{address}</span>
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.button} onClick={handleSave}>
            저장
          </button>
          <button style={styles.button} onClick={handleCancel}>
            취소
          </button>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    overflow: "hidden",
    position: "relative",
  },
  main: {
    paddingTop: "20px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 60,
    marginLeft: 20,
    fontWeight: "600",
    color: "#222",
  },
  formRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginLeft: "10px",
  },
  icon: {
    fontSize: 20,
    color: "#888",
  },
  label: {
    minWidth: 80,
    fontSize: 14,
    color: "#222",
  },
  input: {
    width: "230px",
    padding: "6px 10px",
    fontSize: 14,
    borderRadius: 6,
    border: "1.5px solid #ccc",
    outline: "none",
    boxSizing: "border-box",
  },
  addressText: {
    fontSize: 14,
    color: "#555",
    marginLeft: 8,
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    marginTop: 40,
  },
  button: {
    padding: "6px 20px",
    fontSize: 14,
    borderRadius: 20,
    border: "1.5px solid #bbb",
    backgroundColor: "#56c8d8",
    cursor: "pointer",
    minWidth: 80,
  },
};

export default EditAddressScreen;

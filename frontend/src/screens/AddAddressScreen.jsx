// AddAddressScreen.jsx
import React, { useState } from "react";
import AddTopBar from "../components/AddTopBar";

const AddAddressScreen = () => {
 const [addressName, setAddressName] = useState("");
 const [addressDetail, setAddressDetail] = useState("");

  const handleCurrentLocationClick = () => {
    // 여기서 위치 기반 주소 검색 로직 추가 가능
  };

  return (
    <div style={styles.container}>
      <AddTopBar />
      <main style={styles.main}>
        <h2 style={styles.title}>주소 추가</h2>

        <input
        type="text"
        placeholder="주소의 이름(집, 학교 등)을 입력해주세요."
        value={addressName}
        onChange={(e) => setAddressName(e.target.value)}
        style={styles.input}
        />

        <input
        type="text"
        placeholder="주소를 입력해주세요."
        value={addressDetail}
        onChange={(e) => setAddressDetail(e.target.value)}
        style={styles.input}
        />

        <button style={styles.locationBtn} onClick={handleCurrentLocationClick}>
          현재 위치로 주소 찾기
        </button>
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
    flex: 1,
    padding: 20,
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  title: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  input: {
    height: 40,
    fontSize: 14,
    padding: "0 10px",
    borderRadius: 6,
    border: "1.5px solid #ccc",
    outline: "none",
  },
  locationBtn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#56c8d8",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    fontSize: "16px",
    cursor: "pointer",
    boxSizing: "border-box",
  },
};

export default AddAddressScreen;

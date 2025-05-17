// AddressListScreen.jsx
import React, { useState } from "react";
import { FiMapPin } from "react-icons/fi";
import AddTopBar from "../components/AddTopBar";
import { useNavigate } from "react-router-dom";

const sampleAddresses = [
  { id: 1, label: "학교", address: "서울 서대문구 이화여대길 52" },
  { id: 2, label: "집", address: "서울시 강남구 언주로30길 56" },
  { id: 3, label: "연두네 집", address: "서울시 송파구 올림픽로 269" },
];

const AddressListScreen = () => {
  const [addresses, setAddresses] = useState(sampleAddresses);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    const addressToEdit = addresses.find(addr => addr.id === id);
    if (!addressToEdit) return;
    navigate("/editaddress", { state: { address: addressToEdit } });
  };

  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setAddresses((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAdd = () => {
    // 추가 로직 구현 예정
  };

  return (
    <div style={styles.container}>
      <AddTopBar />
      {/* 주소록 제목 */}
      <div style={styles.sectionTitle}>주소록</div>

      {/* 주소 리스트 */}
      <div style={styles.addressList}>
        {addresses.map(({ id, label, address }) => (
          <div key={id} style={styles.addressItem}>
            <div style={styles.addressHeader}>
              <FiMapPin style={styles.icon} />
              <span style={styles.addressLabel}>{label}</span>
            </div>
            <div style={styles.addressText}>{address}</div>
            <div style={styles.btnRow}>
              <button style={styles.btn} onClick={() => handleEdit(id)}>
                수정
              </button>
              <button style={styles.btn} onClick={() => handleDelete(id)}>
                삭제
              </button>
            </div>
          </div>
        ))}
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
    backgroundColor: "#fff",
    overflow: "hidden",
    position: "relative",
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 60,
    marginLeft: 20,
    fontWeight: "600",
    color: "#222",
  },
  addressList: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  addressItem: {
    borderBottom: "1px solid #ddd",
    paddingBottom: 16,
    paddingLeft: 30,
  },
  addressHeader: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  icon: {
    fontSize: 20,
    color: "#888",
  },
  addressLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  addressText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    paddingLeft: 26, // 아이콘 공간만큼 들여쓰기
  },
  btnRow: {
    display: "flex",
    gap: 8,
    paddingLeft: 26, // 버튼 왼쪽 정렬 맞춤
  },
  btn: {
    fontSize: 14,
    padding: "4px 14px",
    borderRadius: 20,
    border: "1.5px solid #bbb",
    backgroundColor: "transparent",
    cursor: "pointer",
    color: "#444",
  },
};

export default AddressListScreen;

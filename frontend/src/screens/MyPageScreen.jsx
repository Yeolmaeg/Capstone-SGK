import React from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

const MyPageScreen = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.topBarContainer}>
        <TopBar title="Dayfull" buttonLabel="편집" onButtonClick={() => navigate("/mypage-edit")} />
      </div>
      <div style={styles.content}>
        <div style={styles.profileSection}>
          <div style={styles.profileImage} />
          <div style={styles.nickname}>닉네임</div>
        </div>

        <div style={styles.infoSection}>
            <div style={styles.infoRow}>
                <span style={styles.boldText}>ID</span>
                <input type="text" value="ewhain" readOnly style={styles.input} />
            </div>
        <div style={styles.divider} />
          <div style={styles.infoRow}>
            <span style={styles.boldText}>학교</span>
            <input type="text" value="이화여자대학교" readOnly style={styles.input} /></div>
          <div style={styles.divider} />
          <div style={styles.infoRow}>
            <span style={styles.boldText}>학번</span>
            <input type="text" value="2371006" readOnly style={styles.input} /></div>
          <div style={styles.divider} />
        </div>

        <div style={styles.menuSection}>
          <div style={styles.menuItem} onClick={() => navigate("/timetable")}>
            <span style={styles.menuText}>시간표</span>
            <span style={styles.menuArrow}>➝</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.menuItem} onClick={() => navigate("/contacts")}>
            <span style={styles.menuText}>주소록</span>
            <span style={styles.menuArrow}>➝</span>
          </div>
          <div style={styles.divider} />
          <div style={styles.menuItem} onClick={() => navigate("/events")}>
            <span style={styles.menuText}>이벤트 모아보기</span>
            <span style={styles.menuArrow}>➝</span>
          </div>
        </div>
      </div>
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
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    position: "relative",
    overflow: "hidden",
  },
  topBarContainer: {
    width: "100%",
    position: "relative",
  },
  content: {
    marginTop: "100px", 
    width: "100%",
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
  },
  nickname: {
    marginTop: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  infoSection: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#ddd",
    margin: "5px 0",
  },
  input: {
    border: "none",
    backgroundColor: "transparent",
    textAlign: "right",
    width: "70%",
  },
  menuSection: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "5px 0",
  },
  menuText: {
    fontWeight: "bold",
    textAlign: "left",
  },
  menuArrow: {
    textAlign: "right",
  },
  boldText: {
    fontWeight: "bold",
  },
};

export default MyPageScreen;

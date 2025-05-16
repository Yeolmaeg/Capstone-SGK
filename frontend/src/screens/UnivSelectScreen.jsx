import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar";

const universities = [
"가톨릭대학교", "감리교신학대학교", "건국대학교", "경기대학교", "경희대학교", "고려대학교", "광운대학교", "국민대학교", "덕성여자대학교", "동국대학교", "동덕여자대학교", "명지대학교", "삼육대학교", "상명대학교", "서강대학교", "서경대학교", "서울과학기술대학교", "서울교육대학교", "서울기독대학교", "서울대학교", "서울시립대학교", "서울여자대학교", "서울한영대학교", "성공회대학교", "성균관대학교", "성신여자대학교", "세종대학교", "숙명여자대학교", "숭실대학교", "연세대학교", "육군사관학교", "이화여자대학교", "장로회신학대학교", "중앙대학교", "총신대학교", "추계예술대학교", "한국방송통신대학교", "한국성서대학교", "한국예술종합학교", "한국외국어대학교", "한국체육대학교", "한성대학교", "한양대학교", "홍익대학교"
];

const UnivSelectScreen = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState(universities);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setFilteredUniversities(
      universities.filter((univ) =>
        univ.includes(value)
      )
    );
    setShowDropdown(true);
  };

  const handleSelectUniversity = (university) => {
    setSearchTerm(university);
    setShowDropdown(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>대학교를 선택해주세요.</h1>
      <div style={styles.searchContainer}>
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            style={styles.input} 
            placeholder="학교명을 입력해주세요." 
            value={searchTerm} 
            onChange={handleInputChange} 
            onFocus={() => {
              setFilteredUniversities(universities);
              setShowDropdown(true);
            }}
          />
        </div>
        {showDropdown && filteredUniversities.length > 0 && (
          <ul style={styles.dropdown}>
            {filteredUniversities.map((univ, index) => (
              <li 
                key={index} 
                style={{
                  ...styles.dropdownItem,
                  backgroundColor: index === highlightedIndex ? "#eee" : "transparent"
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
                onMouseLeave={() => setHighlightedIndex(-1)}
                onClick={() => handleSelectUniversity(univ)}
              >
                {univ}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button style={styles.button} onClick={() => navigate("/timetable-upload")}>완료</button>
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    margin: "0 auto",
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
    fontSize: "20px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "40px",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    maxWidth: "300px",
    marginBottom: "350px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "8px 10px",
    marginBottom: "0px",
  },
  searchIcon: {
    marginRight: "8px",
    fontSize: "16px",
    color: "#888",
  },
  input: {
    border: "none",
    outline: "none",
    width: "100%",
    fontSize: "14px",
  },
  dropdown: {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "white",
    maxHeight: "200px",
    overflowY: "auto",
    listStyle: "none",
    padding: "5px",
    margin: "0",
  },
  dropdownItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
  button: {
    width: "85px",
    padding: "10px",
    backgroundColor: "#56c8d8",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default UnivSelectScreen;

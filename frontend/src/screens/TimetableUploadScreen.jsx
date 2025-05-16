import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadTimetableImage } from "../api/uploadTimetableImage"; // API 함수 임포트

const semesters = [
  "2025년 1학기",
  "2024년 겨울학기",
  "2024년 2학기",
  "2024년 여름학기",
  "2024년 1학기"
];

const TimetableUploadScreen = () => {
  const navigate = useNavigate();
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [detectedLectures, setDetectedLectures] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(URL.createObjectURL(file));

      try {
        setIsUploading(true);
        const lectures = await uploadTimetableImage(file);
        console.log("OCR 결과:", lectures);
        setDetectedLectures(lectures);
      } catch (error) {
        console.error("OCR 처리 실패:", error);
        alert("OCR 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setIsUploading(false);
      }
    }
  };

   const handleConfirm = () => {
    // 학기와 OCR 결과를 다음 화면으로 전달
    navigate("/dateselection", {
      state: {
        semester: selectedSemester,
        lectures: detectedLectures,
      },
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>시간표를 업로드해주세요.</h1>

      {/* 파일 업로드 버튼 */}
      <label htmlFor="fileUpload" style={styles.uploadBox}>
        {uploadedFile ? (
          <img src={uploadedFile} alt="Uploaded" style={styles.uploadedImage} />
        ) : (
          <span style={styles.plusIcon}>+</span>
        )}
      </label>
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      {/* 학기 선택 목록 */}
      <div style={styles.semesterList}>
        {semesters.map((semester, index) => (
          <div
            key={index}
            style={{
              ...styles.semesterItem,
              fontWeight: selectedSemester === semester ? "bold" : "normal",
              fontSize: selectedSemester === semester ? "20px" : "12px",
              color: selectedSemester === semester ? "#000" : "#888"
            }}
            onClick={() => setSelectedSemester(semester)}
          >
            {semester}
          </div>
        ))}
      </div>

      {/* 확인 버튼 */}
      <button
        style={styles.button}
        onClick={handleConfirm}
        disabled={isUploading || detectedLectures.length === 0}
      >
        {isUploading ? "처리 중..." : "확인"}
      </button>
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
    fontSize: "18px",
    fontWeight: "bold",
    color: "#222",
    marginBottom: "20px",
  },
  uploadBox: {
    width: "240px",
    height: "240px",
    backgroundColor: "#eee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "00px",
    cursor: "pointer",
    marginBottom: "40px",
    overflow: "hidden",
  },
  plusIcon: {
    fontSize: "60px",
    color: "#666",
  },
  uploadedImage: {
    width: "auto",
    height: "100%",
    maxWidth: "240px",
    maxHeight: "240px",
    objectFit: "contain", // 비율 유지
    borderRadius: "10px",
  },
  semesterList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "40px",
  },
  semesterItem: {
    cursor: "pointer",
    padding: "1px",
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

export default TimetableUploadScreen;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import UnivSelectScreen from "./screens/UnivSelectScreen";
import TimetableUploadScreen from "./screens/TimetableUploadScreen";
import ScanningScreen from "./screens/ScanningScreen";
import ScannedScreen from "./screens/ScannedScreen";
import MyPageScreen from "./screens/MyPageScreen";
import MyPageEditScreen from "./screens/MyPageEditScreen";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/univ-select" element={<UnivSelectScreen />} />
        <Route path="/timetable-upload" element={<TimetableUploadScreen />} />
        <Route path="/scanning" element={<ScanningScreen />} />
        <Route path="/scanned" element={<ScannedScreen />} />
        <Route path="/mypage" element={<MyPageScreen />} />
        <Route path="/mypage-edit" element={<MyPageEditScreen />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnivSelectScreen from "./screens/UnivSelectScreen";
import TimetableUploadScreen from "./screens/TimetableUploadScreen";
import DateSelectionScreen from "./screens/DateSelectionScreen"; 
import ScanningScreen from "./screens/ScanningScreen";
import ScannedScreen from "./screens/ScannedScreen";
import CalendarViewScreen from "./screens/CalendarViewScreen";
import TimelineViewScreen from "./screens/TimelineViewScreen";
import AddScheduleScreen from "./screens/AddScheduleScreen";
import ScheduleDetailScreen from "./screens/ScheduleDetailScreen";
import EditScheduleScreen from "./screens/EditScheduleScreen";
import RecommendationScreen from "./screens/RecommendationScreen";
import RecommendationDetailScreen from "./screens/RecommendationDetailScreen";
import EditRecommendationScreen from "./screens/EditRecommendationScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UnivSelectScreen />} />
        <Route path="/timetable-upload" element={<TimetableUploadScreen />} />
        <Route path="/dateselection" element={<DateSelectionScreen />} />
        <Route path="/scanning" element={<ScanningScreen />} />
        <Route path="/scanned" element={<ScannedScreen />} />
        <Route path="/calendarview" element={<CalendarViewScreen />} />
        <Route path="/timelineview" element={<TimelineViewScreen />} />
        <Route path="/addschedule" element={<AddScheduleScreen />} />
        <Route path="/scheduledetail" element={<ScheduleDetailScreen />} />
        <Route path="/editschedule" element={<EditScheduleScreen />} />
        <Route path="/recommendation" element={<RecommendationScreen />} />
        <Route path="/recommendationdetail" element={<RecommendationDetailScreen />} />
        <Route path="/editrecommendation" element={<EditRecommendationScreen />} />
      </Routes>
    </Router>
  );
};

export default App;

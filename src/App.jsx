// App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FacultyLogin from "./pages/FacultyLogin";
import FacultyCourses from "./pages/FacultyCourses";
import StudentLogin from "./pages/StudentLogin";
import StudentAttendance from "./pages/StudentAttendance";
import TakeAttendance from "./pages/TakeAttendance";
import './app.css'; // Import the CSS file

function App() {
  return (
    <Router>
      <div className="full-page-background">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faculty/login" element={<FacultyLogin />} />
          <Route path="/faculty/:faculty_id/courses" element={<FacultyCourses />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/:student_id/attendance" element={<StudentAttendance />} />
          <Route path="/faculty/:faculty_id/:course_id/attendance" element={<TakeAttendance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

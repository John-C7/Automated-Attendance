import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Students from "./student_pages/Students";
import Add from "./student_pages/Add";
import Update from "./student_pages/Update";
import Teacher from "./teachers_pages/Teachers";
import AddTeacher from "./teachers_pages/Add";
import Login from "./admin_pages/login";
import Admin from "./admin_pages/admin";
import Attendance from "./student_pages/Attendance";
import FaceRecognitionPage from "./student_pages/Attendace2";
import AttendanceAnalyticsPage from "./student_pages/Analytics";
import AuthProvider from "./AuthProvider";
import "./App.css";
import { NotFound } from "./NotFound";
import NotAuthorized from "./NotAuthorized";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        {/* <Route element={<AuthProvider />}>
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/face" element={<FaceRecognitionPage />} />
        </Route> */}
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/face" element={<FaceRecognitionPage />} />
        <Route path="/students" element={<Students />} />
        <Route path="/add-student" element={<Add />} />
        <Route path="/update-student" element={<Update />} />
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/add-teacher" element={<AddTeacher />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/analytics" element={<AttendanceAnalyticsPage />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/NotAuthorized" element={<NotAuthorized />} />
      </Routes>
    </div>
  );
}

export default App;

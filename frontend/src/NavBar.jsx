import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
function NavBar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/attendance" className="nav-link">Attendance</Link>
        </li>
        <li>
          <Link to="/face" className="nav-link">Face Recognition</Link>
        </li>
        <li>
          <Link to="/students" className="nav-link">Students</Link>
        </li>
        <li>
          <Link to="/add-student" className="nav-link">Add Student</Link>
        </li>
        <li>
          <Link to="/update-student" className="nav-link">Update Student</Link>
        </li>
        <li>
          <Link to="/teachers" className="nav-link">Teachers</Link>
        </li>
        <li>
          <Link to="/add-teacher" className="nav-link">Add Teacher</Link>
        </li>
        <li>
          <Link to="/admin" className="nav-link">Admin</Link>
        </li>
        <li>
          <Link to="/analytics" className="nav-link">Analytics</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;


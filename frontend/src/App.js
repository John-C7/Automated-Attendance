import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Students from "./student_pages/Students";
import Add from "./student_pages/Add";
import Update from "./student_pages/Update";
import Teacher from "./teachers_pages/Teachers";
import AddTeacher from "./teachers_pages/Add";
import Login from "./admin_pages/login";
import Admin from "./admin_pages/admin";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/students" element={<Students />} />
          <Route path="/add-student" element={<Add />} />
          <Route path="/update-student" element={<Update />} />
          <Route path="/teachers" element={<Teacher />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

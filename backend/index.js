import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

app.use(cors());
// app.use(
//   cors({
//     origin: "https://attendance-frontend-psi.vercel.app",
//     credentials: true,
//   })
// );

app.use(cookieParser());

const upload = multer({ dest: "uploads/" });

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "123456",
//   database: "DBMS12",
// });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// const db = mysql.createConnection({
//   host: "database-1.c5cwsq882teb.eu-north-1.rds.amazonaws.com",
//   user: "admin",
//   password: "aws123456",
//   database: "DBMS123",
// });

app.get("/", (req, res) => {
  res.json("Hello this is from backend");
});

app.get("/students", (req, res) => {
  const q = "SELECT * FROM DBMS123.students";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/students", upload.single("Photo"), (req, res) => {
  const q =
    "INSERT INTO DBMS123.students (`id`,`usn`,`First_Name`,`Last_Name`,`Course`,`Email`,`Photo`) VALUES (?,?,?,?,?,?,?)";
  const values = [
    req.body.id,
    req.body.usn,
    req.body.First_Name,
    req.body.Last_Name,
    req.body.Course,
    req.body.Email,
    req.file ? fs.readFileSync(req.file.path) : null,
  ];
  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Error inserting student details: " + err.stack);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json("Student details have been inserted");
  });
});

//Teachers Table

app.get("/teachers", (req, res) => {
  const q = "SELECT * FROM DBMS123.teachers";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/teachers", (req, res) => {
  const q =
    "INSERT INTO DBMS123.teachers (`slno`,`Reg_no`,`Firstname`,`Lastname`,`Subjects`,`Email_id`) VALUES (?)";
  const values = [
    req.body.slno,
    req.body.Reg_no,
    req.body.Firstname,
    req.body.Lastname,
    req.body.Subjects,
    req.body.Email_id,
  ];
  db.query(q, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json("Student details have been inserted");
  });
});

app.post("/admin", (req, res) => {
  const q = "SELECT * FROM DBMS123.admin WHERE name = ? AND password = ?";
  const values = [req.body.username, req.body.password];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Error during database query:", err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    if (result.length > 0) {
      res.cookie("admin_id", result[0].id, { httpOnly: true });
      res.status(200).json(result[0]);
    } else {
      res.status(401).json({ message: "Wrong Username or Password" });
    }
  });
});

app.get("/auth/check", (req, res) => {
  const adminId = req.cookies.admin_id;
  if (adminId) {
    // User is authenticated
    res.status(200).json({ isAuthenticated: true });
  } else {
    res.status(401).json({ isAuthenticated: false });
  }
});

app.get("/attendance/:student_usn/:subject_id", (req, res) => {
  const { student_usn, subject_id } = req.params;
  const q = `SELECT * FROM DBMS123.attendance WHERE student_usn = '${student_usn}' AND subject_id = '${subject_id}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    return res.json(data);
  });
});

// app.get("/attendance/analytics/:student_usn", (req, res) => {
//   const { student_usn } = req.params;
//   const q = `SELECT SUBJECT_ID, COUNT(*) AS count FROM DBMS123.attendance WHERE student_usn = '${student_usn}' GROUP BY SUBJECT_ID`;
//   db.query(q, (err, data) => {
//     if (err) return res.status(500).json({ error: "Internal Server Error" });
//     return res.json(data);
//   });
// });

app.post("/attendance", (req, res) => {
  const { student_usn, subject_id, date, status } = req.body;

  const checkStudentQuery = `SELECT * FROM DBMS123.students WHERE USN = ?`;
  db.query(checkStudentQuery, [student_usn], (err, studentResult) => {
    if (err) {
      console.error("Error checking student: " + err.stack);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (studentResult.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const insertAttendanceQuery = `INSERT INTO DBMS123.attendance (student_usn, subject_id, date, status) VALUES (?, ?, ?, ?)`;
    const values = [student_usn, subject_id, date, status];
    db.query(insertAttendanceQuery, values, (err, result) => {
      if (err) {
        console.error("Error inserting attendance: " + err.stack);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json("Attendance inserted successfully");
    });
  });
});

app.delete("/students/:usn", (req, res) => {
  const { usn } = req.params;
  const q = "DELETE FROM DBMS123.students WHERE usn = ?";
  db.query(q, [usn], (err, result) => {
    if (err) {
      console.error("Error deleting student details: " + err.stack);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json("Student details have been deleted");
  });
});

app.get("/students/:course", (req, res) => {
  const { course } = req.params;
  const q = `
    SELECT COUNT(*) AS numStudents
    FROM DBMS123.StudentsInCourse
    WHERE Course = '${course}';
  `;
  db.query(q, (err, result) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    const numStudents = result[0].numStudents;
    const q2 = `SELECT * FROM DBMS123.StudentsInCourse WHERE Course = '${course}'`;
    db.query(q2, (err, data) => {
      if (err) return res.status(500).json({ error: "Internal Server Error" });
      return res.json({ students: data, numStudents });
    });
  });
});

// app.listen(8800, () => {
//   console.log("Connected to Backend");
// });

app.listen(process.env.PORT || 8800, () => {
  console.log("Connected to Backend");
});

// // Close the connection
// db.end((err) => {
//   if (err) {
//     console.error("Error closing connection: " + err.stack);
//     return;
//   }
//   console.log("Connection closed");
// });

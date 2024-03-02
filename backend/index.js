import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "project",
});

app.get("/", (req, res) => {
  res.json("Hello this is from backend");
});

app.get("/students", (req, res) => {
  const q = "SELECT * FROM students";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/students", (req, res) => {
  const q =
    "INSERT INTO students (`id`,`usn`,`First_Name`,`Last_Name`,`Course`,`Email`) VALUES (?)";
  const values = [
    req.body.id,
    req.body.usn,
    req.body.First_Name,
    req.body.Last_Name,
    req.body.Course,
    req.body.Email,
  ];
  db.query(q, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json("Student details have been inserted");
  });
});

//Teachers Table

app.get("/teachers", (req, res) => {
  const q = "SELECT * FROM teachers";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/teachers", (req, res) => {
  const q =
    "INSERT INTO teachers (`slno`,`Reg_no`,`Firstname`,`Lastname`,`Subjects`,`Email_id`) VALUES (?)";
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
  const q = "SELECT * FROM admin WHERE username = ? AND password = ?";
  const values = [req.body.username, req.body.password];

  db.query(q, values, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res.status(401).json({ message: "Wrong Username or Password" });
    }
  });
});

app.listen(8800, () => {
  console.log("Connected to Backend");
});

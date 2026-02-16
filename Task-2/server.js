const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();

// ✅ serve frontend files
app.use(express.static(__dirname));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "student_data"
});

db.connect(err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("✅ MySQL Connected");
});

// ✅ HOME ROUTE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// APIs
app.get("/students", (req, res) => {
    db.query("SELECT name,email,dept,DOB FROM student", (err, result) => {
        res.json({ success: true, data: result });
    });
});

app.get("/students/sort/name", (req, res) => {
    db.query("SELECT name,email,dept,DOB FROM student ORDER BY name", (err, result) => {
        res.json({ success: true, data: result });
    });
});

app.get("/students/sort/dob", (req, res) => {
    db.query("SELECT name,email,dept,DOB FROM student ORDER BY DOB", (err, result) => {
        res.json({ success: true, data: result });
    });
});

app.get("/students/filter/:dept", (req, res) => {
    db.query(
        "SELECT name,email,dept,DOB FROM student WHERE dept=?",
        [req.params.dept],
        (err, result) => {
            res.json({ success: true, data: result });
        }
    );
});

app.get("/students/count", (req, res) => {
    db.query(
        "SELECT dept, COUNT(*) total FROM student GROUP BY dept",
        (err, result) => {
            res.json({ success: true, data: result });
        }
    );
});

app.listen(3000, () => {
    console.log("🚀 http://localhost:3000");
});

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "studentdb"
});

db.connect(err => {
    if (err) {
        console.error("DB connection failed:", err);
        return;
    }
    console.log("MySQL Connected");
});

app.post("/students", (req, res) => {
    console.log(" API HIT ");
    console.log("BODY:", req.body);

    const sql = `
        INSERT INTO students2
        (name, email, dob, department, phone, gender)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
        req.body.name,
        req.body.email,
        req.body.dob,      // YYYY-MM-DD
        req.body.dept,
        req.body.number,
        req.body.gender
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("❌ MySQL Error:", err);
            return res
                .status(500)
                .json({ message: "Student not registered" });
        }

        console.log("✅ Inserted ID:", result.insertId);
        res.json({ message: "Student registered successfully" });
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

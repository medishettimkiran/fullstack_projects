const express = require("express");
const mysql = require("mysql2");
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
        console.log("❌ DB connection failed", err);
        return;
    }
    console.log("MySQL Connected");
});

app.get("/", (req, res) => {
    res.send("Server running");
});

app.post("/login", (req, res) => {

    if (!req.body.username || !req.body.password) {
        return res.json({
            success: false,
            message: "All fields required"
        });
    }

    const username = req.body.username.trim();
    const password = req.body.password.trim();

    const sql = "SELECT * FROM users WHERE username=? AND password=?";

    db.query(sql, [username, password], (err, result) => {
        console.log("DB RESULT:", result);

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error"
            });
        }

        if (result.length > 0) {
            res.json({ success: true });
        } else {
            res.json({
                success: false,
                message: "Invalid credentials"
            });
        }
    });
});

app.listen(3000, () => {
    console.log(" Server running on port 3000");
});

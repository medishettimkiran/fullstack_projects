const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "paymentdb"
});

db.connect(err => {
    if (err) throw err;
    console.log("✅ MySQL Connected");
});


app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});


app.get("/merchants", (req, res) => {
    db.query("SELECT * FROM merchants", (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
});


app.post("/pay", (req, res) => {
    const { userId, merchantId, amount } = req.body;

    if (!userId || !merchantId || !amount) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    db.beginTransaction(err => {
        if (err) throw err;

        
        const deductUserQuery = "UPDATE users SET balance = balance - ? WHERE id = ? AND balance >= ?";
        db.query(deductUserQuery, [amount, userId, amount], (err, result) => {
            if (err) return db.rollback(() => res.status(500).json({ message: err.message }));
            if (result.affectedRows === 0) {
                return db.rollback(() => res.status(400).json({ message: "Insufficient funds" }));
            }

            
            const addMerchantQuery = "UPDATE merchants SET balance = balance + ? WHERE id = ?";
            db.query(addMerchantQuery, [amount, merchantId], (err, result) => {
                if (err) return db.rollback(() => res.status(500).json({ message: err.message }));

                
                db.commit(err => {
                    if (err) return db.rollback(() => res.status(500).json({ message: err.message }));

                    res.json({ message: "Payment successful ✅" });
                });
            });
        });
    });
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));

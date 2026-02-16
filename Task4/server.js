const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;

/* Middleware */
app.use(express.json());
app.use(express.static(__dirname));

/* MySQL Connection */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",   // change if needed
  database: "ecommerce"
});

db.connect(err => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
    return;
  }
  console.log("✅ MySQL Connected");
});

/* Load HTML */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "task4.html"));
});

/* CUSTOMER ORDER HISTORY */
app.get("/orders", (req, res) => {
  const sql = `
    SELECT 
      c.name AS customer,
      p.product_name AS product,
      o.quantity,
      (p.price * o.quantity) AS total
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    JOIN products p ON o.product_id = p.product_id
    ORDER BY total DESC
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* HIGHEST VALUE ORDER */
app.get("/highest-order", (req, res) => {
  const sql = `
    SELECT MAX(p.price * o.quantity) AS highestOrder
    FROM orders o
    JOIN products p ON o.product_id = p.product_id
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

/* MOST ACTIVE CUSTOMER */
app.get("/active-customer", (req, res) => {
  const sql = `
    SELECT c.name, COUNT(o.order_id) AS totalOrders
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    GROUP BY c.customer_id
    ORDER BY totalOrders DESC
    LIMIT 1
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
});

/* Start Server */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

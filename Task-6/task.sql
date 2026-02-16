CREATE DATABASE order_management;
USE order_management;

CREATE TABLE activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(50),
    action_type VARCHAR(20),
    record_id INT,
    action_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    quantity INT,
    order_date DATE
);
DELIMITER //

CREATE TRIGGER orders_after_insert
AFTER INSERT ON orders
FOR EACH ROW
BEGIN
    INSERT INTO activity_log (table_name, action_type, record_id)
    VALUES ('orders', 'INSERT', NEW.id);
END//

DELIMITER ;
CREATE VIEW daily_activity_report AS
SELECT 
    DATE(action_time) AS activity_date,
    table_name,
    action_type,
    COUNT(*) AS total_actions
FROM activity_log
GROUP BY DATE(action_time), table_name, action_type
ORDER BY activity_date DESC;


INSERT INTO orders (customer_id, product_id, quantity, order_date)
VALUES (1, 2, 1, CURDATE());

SELECT * FROM activity_log;
SELECT * FROM  daily_activity_report;



CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE products;
CREATE TABLE products (
item_id INT(4) NOT NULL,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(20) NOT NULL,
PRIMARY KEY (item_id)

);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1, "Towel", "bath", 7.99, 30),
	   (2, "Diaper","Baby", 4.99, 15),
       (3, "shampoo","Hair Care", 6.99, 50),
       (4, "deodorant","Body Care", 5.99, 75),
       (5, "Printer", "Office",29.99, 60),
       (6, "Planters","Home Decor", 3.99, 56),
       (7, "Microwave","Kitchen", 98.50, 50),
       (8, "Hand Sanitizer","Health", 3.50, 25),
       (9, "candle","Home Goods", 5.49, 17),
       (10, "bouque","flower", 11.86, 20)
       
       

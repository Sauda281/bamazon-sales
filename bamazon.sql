CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT,
product_name VARCHAR (10) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(20) NOT NULL,
PRIMARY KEY (item_id)

);

SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (100, "Towel", "bath", 7.99, 30),
	   (202, "Diaper","Baby", 4.99, 15),
       (320, "shampoo","Hair Care", 6.99, 50),
       (444, "deodorant","Body Care", 5.99, 75),
       (501, "Printer", "Office",29.99, 60),
       (651, "Planters","Home Decor", 3.99, 56),
       (718, "Microwave","Kitchen", 98.50, 50),
       (860, "Hand Sanitizer","Health", 3.50, 25),
       (980, "candle","Home Goods", 5.49, 17),
       (1023, "lotion","", 11.86, 20)
       
       

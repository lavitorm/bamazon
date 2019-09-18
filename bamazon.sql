/*
1. Create a MySQL Database called `bamazon`.
2. Then create a Table inside of that database called `products`.
3. The products table should have each of the following columns:
   * item_id (unique id for each product)
   * product_name (Name of product)
   * department_name
   * price (cost to customer)
   * stock_quantity (how much of the product is available in stores)
4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

SHOW DATABASES;
*/
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
/* connect to the bamazon database*/
USE bamazon_db;
CREATE TABLE products (
  item_id INT (10) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT (100) NOT NULL,
  PRIMARY KEY (item_id)
);
SELECT * FROM products;
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("shoes", "kids", 99.99, 5), 
("hat", "women", 69.99, 6), ("ball", "sports", 24.00, 8), ("pants", "men", 79.99, 16), ("shorts", "kids", 35.00, 10),
("TV", "eletronics", 399.99, 20), ("computer", "eletronics", 499.99, 11), ("rug", "home", 109.99, 2), 
("sweater", "women", 39.99, 8), ("coat", "men", 199.99, 10);
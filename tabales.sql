CREATE DATABASE IF NOT EXISTS  database_event_management;
use database_event_management;
CREATE TABLE IF NOT EXISTS categories(
 category_code int primary key,
 category_name varchar(100) not null

);
CREATE TABLE IF NOT EXISTS business_owners(
 business_owner_code int primary key,
 business_owner_name varchar(100) not null,
 mail varchar(255),
 phone varchar(255)
);
CREATE TABLE IF NOT EXISTS business(
  business_code  int primary key,
  business_name  varchar(255) ,
  code_business_owner int,
    FOREIGN KEY (code_business_owner) REFERENCES business_owners(business_owner_code),
  code_category INT,
    FOREIGN KEY (code_category) REFERENCES categories(category_code),
  logo BLOB ,
  photo_gallery BLOB
  

);

CREATE TABLE IF NOT EXISTS products(
  product_code  int primary key,
  produc_name  varchar(255) ,
    code_business INT NOT NULL,
    FOREIGN KEY (code_business) REFERENCES business(business_code),
 price double
);

CREATE TABLE IF NOT EXISTS customers(
 costomer_code  int primary key,
 costomer_name  varchar(255) ,
 mail  int,
 phone int

);
SHOW TABLES;
CREATE TABLE IF NOT EXISTS my_events(
 event_code  int primary key,
 event_name  varchar(255) ,
  code_costomer INT,
    FOREIGN KEY (code_costomer) REFERENCES customers(costomer_code),
 the_date datetime,
 was_invited bool
);


CREATE TABLE IF NOT EXISTS business_in_event(
 business_in_event_code  int primary key,
 code_event  int not null ,
 FOREIGN KEY (code_event) REFERENCES my_events(event_code),
 code_business  int not null,
 FOREIGN KEY (code_business) REFERENCES business(business_code),
 code_category int,
  FOREIGN KEY (code_category) REFERENCES categories(category_code),
 price double,
 acceptance blob,
 business_owner_approval bool,
 invited bool
);

-- Inserting values into myrecipes table
-- INSERT INTO myrecipes (recipe_id, body) VALUES
-- (1, 'Chocolate Chip Cookie Recipe'),
-- (2, 'Vanilla Cake Recipe'),
-- (3, 'Oatmeal Raisin Cookie Recipe');

-- -- Inserting values into cookies table
-- INSERT INTO cookies (cookie_id, cookie_name, recipe_id) VALUES
-- (1, 'Classic Chocolate Chip Cookies', 1),
-- (2, 'Oatmeal Raisin Cookies', 3),
-- (3, 'Double Chocolate Cookies', 1);

-- -- Inserting values into cakes table
-- INSERT INTO cakes (cake_id, cake_name, recipe_id) VALUES
-- (1, 'Vanilla Birthday Cake', 2),
-- (2, 'Chocolate Fudge Cake', 2),
-- (3, 'Carrot Cake', 3);


ALTER TABLE categories;
ALTER TABLE business_owners;
ALTER TABLE business;
ALTER TABLE products;
ALTER TABLE customers;
ALTER TABLE my_events;
ALTER TABLE business_in_event;


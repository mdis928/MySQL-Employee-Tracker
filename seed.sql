DROP DATABASE IF EXISTS EmployeeDB;
CREATE database EmployeeDB;

USE EmployeeDB;

CREATE TABLE department (
  id AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id),
);

CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL (10,4),
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  position INT NOT NULL,
  artist VARCHAR(100) NULL,
  album VARCHAR(100) NULL,
  year INT NULL,
  raw_total DECIMAL(10,4) NULL,
  raw_usa DECIMAL(10,4) NULL,
  raw_uk DECIMAL(10,4) NULL,
  raw_eur DECIMAL(10,4) NULL,
  raw_row DECIMAL(10,4) NULL,
  PRIMARY KEY (position)
);





-- SELECT * FROM top5000;
-- select * from top_albums;
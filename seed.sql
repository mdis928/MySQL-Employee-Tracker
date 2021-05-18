-- Creates new rows containing data in all named columns --
-- Primary Key is id

-- Department column with values. This comes from the department table. Only need "name" from this table
INSERT INTO department (name)
VALUES (Sales);

INSERT INTO department (name)
VALUES (Engineering);

INSERT INTO department (name)
VALUES (Finance);

INSERT INTO department (name)
VALUES (Legal);


-- Employee columns consists of first_name, last_name. Will need to look into manager data later
INSERT INTO employee (first_name, last_name)
VALUES (Michael, DiSantis);

INSERT INTO employee (first_name, last_name)
VALUES (Jeff, Feldmen);

INSERT INTO employee (first_name, last_name)
VALUES (Damien, Colelli);

INSERT INTO employee (first_name, last_name)
VALUES (Andrew, Steve);

-- Role columns consists of title and salary. Will need to look at department id later
INSERT INTO roles (title, salary)
values (Salesperson, 80000);

INSERT INTO roles (title, salary)
values (Engineer, 150000);

INSERT INTO roles (title, salary)
values (Financial Analyst, 85000);

INSERT INTO roles (title, salary)
values (Lawyer, 200000);










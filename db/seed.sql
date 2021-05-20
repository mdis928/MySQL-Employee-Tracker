-- Creates new rows containing data in all named columns --
-- Primary Key is id

-- Department column with values. This comes from the department table. Only need "name" from this table
INSERT INTO department (name)
VALUES ('Finance/Accounting');

INSERT INTO department (name)
VALUES ('Sales');

INSERT INTO department (name)
VALUES ('Legal');

INSERT INTO department (name)
VALUES ('Engineering');


-- Role columns consists of title and salary and department id (INT)
INSERT INTO roles (title, salary, department_id)
values ('Salesperson', 80000, 1);

INSERT INTO roles (title, salary, department_id)
values ('Engineer', 150000, 2);

INSERT INTO roles (title, salary, department_id)
values ('Financial Analyst', 85000, 3);

INSERT INTO roles (title, salary, department_id)
values ('Lawyer', 200000, 4);


-- Employee columns consists of first_name, last_name, role_id (INT), and manager_id (INT)
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Michael', 'DiSantis', 1, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jeff', 'Feldmen', 2, 10);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Damien', 'Colelli', 3, 11 );

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Andrew', 'Steve', 4, 12);


-- Since there is a manager id, we will need to create insert into and values for manager
INSERT INTO manager (mgr_name, id)
VALUES ('Rachel Salvator', 9)

INSERT INTO manager (mgr_name, id)
VALUES ('Lizzy Lizz', 10)

INSERT INTO manager (mgr_name, id)
VALUES ('Abigail Chet', 11)

INSERT INTO manager (mgr_name, id)
VALUES ('Sharon Bartlebee', 12)


SELECT * FROM employee
SELECT * FROM department
SELECT * FROM roles
SELECT * FROM manager












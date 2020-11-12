-- Pre-populated data inserted into each table

INSERT INTO department (name) VALUES 
("Finance"),
("Software Development"),
("Sales"),
("Accounting");


INSERT INTO role (title, salary, department_id) VALUES 
("Financial Analyst", 70000.00, 1),
("Finance Manager", 95000.00, 1),
("Software Developer", 100000.00, 2),
("Senior Developer", 125000.00, 2),
("Salesman", 50000.00, 3),
("Sales Manager", 80000.00, 3),
("Accountant", 70000.00, 4),
("Accounting Manager", 90000.00, 4)
;

-- Managers and non-managers were inserted separately to take into account that managers do not have a manager so they
-- do not have a manager_id Foreign Key

-- Each employee was also given an employee_id manually even though there is an auto_increment set up in the employee
-- table schema. This is purposely done so that the table is random and it does not list all the managers and then all
-- of the employees

-- Insert managers (with no FK, manager_id)
INSERT INTO employee (employee_id, first_name, last_name, role_id) VALUES
(8, 'Keaton', 'Adams', 4),
(4, 'Brandt', 'Kunze', 8),
(1, 'Benny', 'McLaughlin', 2),
(5, 'Sandy', 'Miller', 6);


-- Insert employees (with a FK for manager_id)
-- **NOTE: It is important that the employees' managers are managers in the same department that the employees are being assigned to
INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id) VALUES 
(2, 'Beau', 'Feeney', 1, 1),
(7, 'Leonor', 'Gerlach', 7, 4),
(6, 'Meggie', 'Weissnat', 3, 8),
(3, 'Lolita', 'Ruecker', 5, 5);
INSERT INTO department (name) VALUES 
("Finance"),
("Software Dev."),
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

-- Insert managers (with no FK for manager_id)
INSERT INTO employee (first_name, last_name, role_id) VALUES
('Keaton', 'Adams', 4),
('Brandt', 'Kunze', 8),
('Benny', 'McLaughlin', 2),
('Sandy', 'Miller', 6);

-- Insert employees (with a FK for manager_id)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('Beau', 'Feeney', 1, 3),
('Leonor', 'Gerlach', 7, 2),
('Meggie', 'Weissnat', 3, 1),
('Lolita', 'Ruecker', 5, 4);
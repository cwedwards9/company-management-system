DROP DATABASE IF EXISTS company;
CREATE DATABASE company;
USE company;

CREATE TABLE employee (
    employee_id INT AUTO_INCREMENT PRIMARY_KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role (role_id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee (employee_id) ON DELETE CASCADE
);


CREATE TABLE role (
    role_id INT AUTO_INCREMENT PRIMARY_KEY,
    title VARCHAR(30),
    salary DECIMAL(8,2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department (dept_id) ON DELETE CASCADE
);


CREATE TABLE department (
    dept_id INT AUTO_INCREMENT PRIMARY_KEY,
    name VARCHAR(30)
);


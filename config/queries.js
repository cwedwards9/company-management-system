const query = {
     viewAllEmployees() {
        return `SELECT e.employee_id AS id, e.first_name, e.last_name,
                role.title, role.salary,
                department.name AS department,
                CONCAT(m.first_name, " ", m.last_name) AS manager
                FROM employee e
                LEFT JOIN employee m
                ON e.manager_id = m.employee_id
                INNER JOIN role
                ON e.role_id = role.role_id
                INNER JOIN department
                ON role.department_id = department.dept_id
                ORDER BY e.employee_id;`;
    },
    viewAllDepts() {
        return "SELECT dept_id AS id, name FROM department;"
    },
    viewAllRoles() {
        return `SELECT r.role_id AS id, r.title, CONCAT('$ ', r.salary) AS salary, d.name AS department
                FROM role r
                INNER JOIN department d
                ON r.department_id = d.dept_id;`;
    },
    viewEmployeesAndIds(){
        return "SELECT employee_id, CONCAT(first_name, ' ', last_name) AS employee FROM employee";
    },

    // ADDING DATA
    createRole() {
        return "INSERT INTO role set ?";
    },
    createDept() {
        return "INSERT INTO department SET ?";
    },
    createEmployee() {
        return "INSERT INTO employee SET ?";
    }
}

module.exports = query;
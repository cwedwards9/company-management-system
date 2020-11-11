const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");
const promptList = require("./promptList");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "company"
});


function init() {
    inquirer.prompt(promptList[0])
    .then(answer => {
        if(answer.mainFunctions === "View All Employees") {
            const q = viewAllEmployees();
            connection.query(q, (err, result) => {
                if(err) throw err;
                // console.log(result);
                console.table("Employees:", result);
            })
        }
        else if(answer.mainFunctions === "View All Departments") {
            const q = "SELECT dept_id AS id, 'department name' FROM department;"
            connection.query(q, (err, result) => {
                if(err) throw err;
                console.table("Departments:", result);
            })
        }
        else if(answer.mainFunctions === "View All Roles") {
            const q = viewAllRoles();
            connection.query(q, (err, result) => {
                if(err) throw err;
                console.table("Roles:", result);
            })
        }
        else if(answer.mainFunctions === "Add Department") {
            inquirer.prompt(promptList[1])
        }
    });
}


// Initialize the application to prompt the user
init();



// QUERIES
function viewAllEmployees() {
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
}

function viewAllRoles() {
    return `SELECT r.role_id AS id, r.title, r.salary, d.name AS department
            FROM role r
            INNER JOIN department d
            ON r.department_id = d.dept_id;`;
}

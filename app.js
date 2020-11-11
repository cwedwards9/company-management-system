const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "company"
});

connection.connect((err) => {
    if(err){
        console.log("Error connecting: " + err.stack);
        return;
    }

    console.log("Connected as id " + connection.threadId);
});

function init() {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "mainFunctions",
            choices: [
                "View All Employees", 
                "View All Employees By Department", 
                "View All Employees By Department", 
                "Add Employee",
                "Remove Employee",
                "Update Employee Table",
                "Update Employee Manager"
            ]
        }
    ]).then(answer => {
        if(answer.mainFunctions === "View All Employees") {
            const q = 
            `select e.employee_id as id, e.first_name, e.last_name,
            role.title, role.salary,
            department.name as department,
            concat(m.first_name, " ", m.last_name) as manager
            from employee e
            left join employee m
            on e.manager_id = m.employee_id
            inner join role
            on e.role_id = role.role_id
            inner join department
            on role.department_id = department.dept_id;`;
            connection.query(q, (err, result) => {
                if(err) throw err;
                // console.log(result);
                console.table("Employees", result);
            })
        }
    })
}


// Initialize the application to prompt the user
init();

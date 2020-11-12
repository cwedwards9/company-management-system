const Department = require("./lib/Department");
const Role = require("./lib/Role");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const cTable = require("console.table");
const promptList = require("./promptList");
const query = require("./config/queries");
const connection = require("./config/connection");


function init() {
    // Gives user first prompt (from promptList.js)
    inquirer.prompt(promptList[0])
    .then(answer => {
        if(answer.mainFunctions === "View All Employees") {
            const q = query.viewAllEmployees();
            connection.query(q, (err, result) => {
                if(err) throw err;
                // console.log(result);
                console.table("Employees:", result);
            })
        }
        else if(answer.mainFunctions === "View All Departments") {
            const q = query.viewAllDepts();
            connection.query(q, (err, result) => {
                if(err) throw err;
                console.table("Departments:", result);
            })
        }
        else if(answer.mainFunctions === "View All Roles") {
            const q = query.viewAllRoles();
            connection.query(q, (err, result) => {
                if(err) throw err;
                console.table("Roles:", result);
            })
        }
        else if(answer.mainFunctions === "Add Department") {
            addDepartment();
        }
    });


    function addDepartment() {
        inquirer.prompt(promptList[1])
        .then(answer => {
            const { newDepartment } = answer;

            const department = new Department(name);
        })
    }


}


// Initialize the application to prompt the user
init();

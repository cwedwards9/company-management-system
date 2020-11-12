const Department = require("./lib/Department");
const Role = require("./lib/Role");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const cTable = require("console.table");
const promptList = require("./promptList");
const query = require("./config/queries");
const connection = require("./config/connection");


function init() {
    function mainMenu() {
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
                    console.log(result);
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
            else if(answer.mainFunctions === "Add Role") {
                addRole();
            }
            else if(answer.mainFunctions === "Add Department") {
                addDepartment();
            }
        });

        function addRole() {
            inquirer.prompt(promptList[1])
                .then(answer => {
                    const { newRoleTitle, newRoleSalary, newRoleDept } = answer;

                    // Based on department name chosen, we must dynamically get the corresponding id to insert into the table
                    var deptNumber;
                    const q1 = query.viewAllDepts();
                    connection.query(q1, (err, result) => {
                        if(err) throw err;
                        for(let i = 0; i < result.length; i++){
                            if(newRoleDept === result[i].name){
                                deptNumber = result[i].id;
                                
                                // Create new instance of role, insert new role into role table with the deptartment id
                                const role = new Role(newRoleTitle, newRoleSalary, deptNumber);
                                const q2 = query.createRole();
                                connection.query(q2, role, (err, result) => {
                                    if(err) throw err;
                                    console.log(role.title + " was successfully inserted into the role table!");
                                });
                            }
                        }
                    });
        
                    mainMenu();
                })
        }

        function addDepartment() {
            inquirer.prompt(promptList[2])
            .then(answer => {
                const { newDepartment } = answer;

                const department = new Department(newDepartment);
                console.log(department);
                const q = query.createDept();
                connection.query(q, department, (err, result) => {
                    if(err) throw err;
                    console.log(department.name + " was successfully inserted into the department table!");
                });

                mainMenu();
            });
        }
    }

    mainMenu();
}


// Initialize the application to prompt the user
init();

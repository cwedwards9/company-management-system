const Employee = require("./lib/Employee");
const Role = require("./lib/Role");
const Department = require("./lib/Department");
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
            const { mainFunctions } = answer;
            if(mainFunctions === "View All Employees") {
                const q = query.viewAllEmployees();
                connection.query(q, (err, result) => {
                    if(err) throw err;
                    console.table("Employees:", result);

                    consoleDelay();
                })
            }
            else if(mainFunctions === "View All Departments") {
                const q = query.viewAllDepts();
                connection.query(q, (err, result) => {
                    if(err) throw err;
                    console.table("Departments:", result);

                    consoleDelay();
                })
            }
            else if(mainFunctions === "View All Roles") {
                const q = query.viewAllRoles();
                connection.query(q, (err, result) => {
                    if(err) throw err;
                    console.table("Roles:", result);

                    consoleDelay();
                })
            }
            else if(mainFunctions === "Add Employee"){
                addEmployee();
            }
            else if(mainFunctions === "Add Role") {
                addRole();
            }
            else if(mainFunctions === "Add Department") {
                addDepartment();
            }
            else if(mainFunctions === "Update Role"){
                updateRole();
            }
            else if(mainFunctions === "I am finished") {
               console.log("Please press 'ctrl + c' to exit");
            }
        });


        function addEmployee() {
            inquirer.prompt(promptList[1])
                .then(answer => {
                    const { newEmployeeFirstName, newEmployeeLastName, newEmployeeRole, newEmployeeManager} = answer;

                    var roleId;
                    const q1 = query.viewAllRoles();
                    connection.query(q1, (err, result) => {
                        if(err) throw err;
                        for(let i = 0; i < result.length; i++){
                            if(newEmployeeRole === result[i].title){
                                roleId = result[i].id;

                                var managerId;
                                const q2 = query.viewEmployeesAndIds();
                                connection.query(q2, (err, result) => {
                                    if(err) throw err;
                                    for(let i = 0; i < result.length; i++){
                                        if(newEmployeeManager === result[i].employee) {
                                            managerId = result[i].employee_id;

                                            const employee = new Employee(newEmployeeFirstName, newEmployeeLastName, roleId, managerId);
                                            const q3 = query.createEmployee();
                                            connection.query(q3, employee, (err, result) => {
                                                if(err) throw err;
                                                console.log(newEmployeeFirstName + " was successfully inserted into the employee table!");
                                            
                                                consoleDelay();
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                });
        }


        function addRole() {
            inquirer.prompt(promptList[2])
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
                                
                                    consoleDelay();
                                });
                            }
                        }
                    });
        
                    mainMenu();
                });
        }

        function addDepartment() {
            inquirer.prompt(promptList[3])
            .then(answer => {
                const { newDepartment } = answer;

                const department = new Department(newDepartment);
                const q = query.createDept();
                connection.query(q, department, (err, result) => {
                    if(err) throw err;
                    console.log(department.name + " was successfully inserted into the department table!");
                });

                consoleDelay();
            });
        }

        function updateRole() {
            inquirer.prompt(promptList[4])
            .then(answer => {
                const { updateRole, columnUpdate, newValue } = answer;

                let q;
                if(columnUpdate === "title") {
                    q = `UPDATE role SET ${columnUpdate} = '${newValue}' WHERE title='${updateRole}'`;
                } else {
                    q = `UPDATE role SET ${columnUpdate} = ${newValue} WHERE title='${updateRole}'`;
                }

                connection.query(q, (err, result) => {
                    if(err) throw err;
                    console.log(updateRole + " was successfully updated!");
                
                    consoleDelay();
                });
            });
        }
    }

    mainMenu();

    // Function for delaying console.log
    function consoleDelay() {
        setTimeout(function() {
            mainMenu();
        }, 2000);
    }      
}


// Initialize the application to prompt the user
init();
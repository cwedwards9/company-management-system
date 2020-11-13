const query = require("./config/queries");
const connection = require("./config/connection");

//Get list of roles from db to add to prompt list
const rolesArray = [];
const q1 = query.getRolesList();
connection.query(q1, (err, result) => {
    if(err) throw err;
    for(let i = 0; i < result.length; i++) {
        rolesArray.push(result[i].title);
    }
});


// Get list of managers from db to add to prompt list
const managersArray = [];
const q2 = query.getManagersList();
connection.query(q2, (err, result) => {
    if(err) throw err;
    for(let i = 0; i < result.length; i++) {
        managersArray.push(result[i].manager);
    }
});


// Get list of departments from db to add to prompt list
const deptArray = [];
const q3 = query.viewAllDepts();
connection.query(q3, (err, result) => {
    if(err) throw err;
    for(let i = 0; i < result.length; i++) {
        deptArray.push(result[i].name);
    }
});


const promptList = [
    {
        type: "list",
        message: "What would you like to do?",
        name: "mainFunctions",
        choices: [
            "View All Employees",
            "View All Roles",
            "View All Departments",
            "Add Employee",
            "Add Role",
            "Add Department",
            "I am finished"
        ]
    },

    
    [
        {
            type: "input",
            message: "What is the new employee's first name?",
            name: "newEmployeeFirstName"
        },
        {
            type: "input",
            message: "What is the new employee's last name?",
            name: "newEmployeeLastName"
        },
        {
            type: "list",
            message: "What is the new employee's role?",
            name: "newEmployeeRole",
            choices: rolesArray
        },
        {
            type: "list",
            message: "Who is the new employee's manager?",
            name: "newEmployeeManager",
            choices: managersArray
        }
    ],


    [
        {
            type: "input",
            message: "What is the name of the new role?",
            name: "newRoleTitle"
        },
        {
            type: "input",
            message: "What is the salary for the new role?",
            name: "newRoleSalary"
        },
        {
            type: "list",
            message: "What department does the new role fall under?",
            name: "newRoleDept",
            choices: deptArray
        }
    ],


    {
        type: "input",
        message: "What is the name of the new department?",
        name: "newDepartment"
    }

    
];

module.exports = promptList;
// For MySQL database
const mysql = require('mysql');
// For NPM inquirer so that we can run prompts
const inquirer = require("inquirer");
// Ask TA or instructor on what this does. Do I need to do an npm install?
const cTable = require("console.table");

let connection = mysql.createConnection({
    // use local host
    host: 'localhost',

    // Use port 3306
    port: 3306,

    // Will be using root user
    user: 'root',

    // When testing make sure to use your password. Make sure to delete password when you do a git push or pull. Talk to TA and instructor about this
    password: 'Password1!',
    database: 'Employee_DB',

});
    //When there is an error in connection  
connection.connect((err) => {
    if (err) throw err;
    runSearch();
});

    // This will start inquirer and give you list of what your want to lookup, add, remove, or update
const runSearch = () => {
    inquirer.prompt ({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices:[
            'Add a department',
            'Add an employee',
            // 'Add a role',
            'View all Employees',
            'View All Employees by Department',
            'View All Employees by Manager',
            // 'Remove Employee',
            // 'Update Employee Role',
            'End Session',
        ]
    })
    .then((answer) => {
        switch (answer.action) {
          case 'Add a department':
            addDepartment();
            break;
              
        //   case 'Add a role':
        //     addRole();
        //     break;

          case 'Add an employee':
            addEmployee ();
            break;  

          case 'View all Employees':
            viewAllEmployees();
            break;
  
          case 'View All Employees by Department':
            viewEmployeesByDepartment();
            break;
  
          case 'View All Employees by Manager':
            viewAllEmployeesByManager();
            break;
  
        //   case 'Update Employee Role':
        //     updateEmployeeRole();
        //     break;

        //   case 'Update Employee Manager':
        //     updateEmployeeManager();
        //     break;  

          case "End Session":
              endSession();
              break;

        // this is case sensitive. The dafault helps when something is not matching case sensitive
          default:
              connection.end();
        }
    });
};

// When I choose add department, I am asked for the name of the department. When I give an answer, that department name is saved
const addDepartment = () => {
    inquirer.prompt ({
        name: "addedDepartment",
        type: "input",
        message: "What is the name of the department?",
    })
    .then ((answer) => {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.addedDepartment
            },
            (err) => {
                if (err) throw err;
                console.table("You have sucessfull added a new department!");
                runSearch();
            }
        );
    });
};

// const addRole = () => {
//     inquirer.prompt ({
//         name: "addedRole",
//         type: "input",
//         message: "What is the new name of the new role?",
//     },
//     {
//         name: "salary",
//         type: "input",
//         message: "What is the salary for the new role",
//     },
//     {

//     })
//     .then ((answer) => {
//         connection.query(
//             "INSERT INTO department",
//             {
//                 name: answer.addedDepartment
//             },
//             (err) => {
//                 if (err) throw err;
//                 console.table("You have sucessfull added a new employee");
//                 runSearch();
//             }
//         );
//     });
// };
    



// This variable is to add an employee
// When I click on add employee, I am given a prompt where I have to give the added employee a first name, last name, role, and manager
const addEmployee = () => {
    inquirer.prompt ([
    {
        name: "firstName",
        type: "input",
        message: "What is the first name of the employee?",
    },
    {
        name: "lastName",
        type: "input",
        message: "What is the last name of the new employee?",
        
    },
    {
        name: "addedRole",
        type: "input",
        message: "What is the role? Please enter role id integer (Salesperson = 1, Engineer = 2, Financial Analyst = 3, Lawyer = 4)",
    },
    {
        name: "addedManager",
        type: "input",
        message: "Who is the employee's manager? Please enter the manager id integer (Rachel Salvator = 9, Lizzy Liz = 10, Abigail Chet = 11, Sharan Bartlebee = 12",
    },
    ]).then((answer) => {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,  
                role_id: answer.addedRole,
                manager_id: answer.addedManager, 
            },
            (err) => {
                if (err) throw err;
                console.table("You have sucessfully added a new employee!");
                runSearch();
            }

        );
        
    });
};

// This variable is to view all employees. Inside this variable, we have a function wherewe want to query the data from EmployeeDB.
// If we type something in wrong, then we get an error 
const viewAllEmployees = () => {
    const query = 'SELECT * FROM employee';
    connection.query = (query, (err, res) => {
        if (err) throw err;
        console.table (res);
        runSearch();
    });
};

// This variable to view all employees by department (engineering, sales, legal, etc)
// choose which department and all employees from that department will show
const viewEmployeesByDepartment = () => {
    let query = 'SELECT department.name, employee.id, employee.first_name, employee.last_name FROM employee';
    query += "LEFT JOIN roles on employee.role_id = roles.id";
    query += "LEFT JOIN department on roles.department_id = department.id";
    query += "WHERE department.id = 1";
    connection.query = (query, (err, res) => {
        console.table ("Employees by Department");
        runSearch()
    })
};

// This variable to pick a manager.
// When you pick a manager, this will show all the manager's employees
const viewAllEmployeesByManager = () => {
    const query = "SELECT manager.name, employee.id, employee.first_name, employee.lastname FROM employee";
    query += "LEFT JOIN roles on employee.role_id =roles.id";
    query += "LEFT JOIN employee on roles.manager_id = manager.id.";
    query += "Where manager.id = 1";
    connection.query = (query, (err, res) => {
        console.table ("Employees by Manager");
        runSearch()
    })
    
};

// To exit the database
function endSession () {
    console.log('You have now ended session. Thank you for using the employee tracker database');
    connection.end();
}









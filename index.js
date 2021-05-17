// For MySQL database
const mysql = require('mysql'),
// For NPM inquirer so that we can run prompts
const inquirer = require("inquirer"),
// Ask TA or instructor on what this does. Do I need to do an npm install?
const cTable = require("console.table")

const connection = mysql.createConnection({
    // use local host
    host: 'localhost',

    // Use port 3306
    port: 3306,

    // Will be using root user
    user: 'root',

    // When testing make sure to use your password. Make sure to delete password when you do a git push or pull. Talk to TA and instructor about this
    password: '',
    database: 'Employee_DB',

});
    //When there is an error in connection  
connection.connect((err) => {
    if (err) throw err;
    start();
});

    // This will start inquirer and give you list of what your want to lookup, add, remove, or update
const start = () => {
    inquirer.prompt ({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices:[
            'View All Employees',
            'View All Employees by Department',
            'View All Employees by Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager'
        ],

    })
    .then((answer) => {
        switch (answer.action) {
          case 'View All Employees':
            viewAllEmployees();
            break;
  
          case 'View All Employees by Department':
            viewEmployeesByDepartment();
            break;
  
          case 'View All Employees by Manager':
            viewAllEmployeesByManager();
            break;
  
          case 'Add Employee':
            addEmployee();
            break;
  
          case 'Update Employee Role':
            updateEmployeeRole();
            break;

          case 'Update Employee Manager':
            updateEmployeeManager();
            break;  

          default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
    });
};

// This variable is to view all employee. Inside this variable, we have a function wherewe want to query the data from EmployeeDB.
// If we type something in wrong, then we get an error 
const viewAllEmployees = () => {
    const query = 'Select employee FROM EmployeeDB';
    connection.query = (query, (err, res) => {
        if (err) throw err;
        console.log (res);
        start();
    });
};

// This variable to view all employees by department (engineering, sales, legal, etc)
// choose which department and all employees from that department will show
const viewEmployeesByDepartment = () => {
    const query = 'SELECT department FROM EmployeeDB';
    connection.query = (query, (err, res) => {
        if (err) throw err;
        console.log (res);
        start();
    });
};

// This variable to pick a manager.
// When you pick a manager, this will show all the manager's employees
const viewAllEmployeesByManager = () => {
    const query = "SELECT manager FROM EmployeeDB";
    connection.query = (query, (err, res) => {
        if (err) throw err;
        console.log (res);
        start();
    });
}



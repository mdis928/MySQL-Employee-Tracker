    // For MySQL database connection
const mysql = require('mysql');

    // So we can run inquirer prompts in the 
const inquirer = require("inquirer");

    // cTable shows data in terminal
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
            'Add a role',
            'View all employees',
            'View all departments',
            'View all roles',
            'View all employees by department',
            'View all employees by manager',
            'End Session',
        ]
    })
    .then((answer) => {
        switch (answer.action) {
          case 'Add a department':
            addDepartment();
            break;
              
          case 'Add an employee':
            addEmployee ();
            break;  
        
          case 'Add a role':
            addRole();
            break;  

          case 'View all employees':
            viewAllEmployees();
            break;
        
          case "View all departments":
             viewAllDepartments();
             break;   
            
          case "View all roles":
              viewAllRoles();
              break;
  
          case 'View all employees by department':
            viewEmployeesByDepartment();
            break;
  
          case 'View all employees by manager':
            viewAllEmployeesByManager();
            break;

          case "End Session":
              endSession();
              break;
    // this is case sensitive. The default helps when something is not matching case sensitive
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
                console.table("You have sucessfully added a new department!");
                runSearch();
            }
        );
    });
};

    // When I click on add employee, I need to put in firstname, lastname, role, and manager. Once I do that, the employee is saved.
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
        connection.query (
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

    // When I click on add a role, I am ask for name, title, id, and department id
const addRole = () => {
    inquirer.prompt ([
        {
            name: "titleRole",
            type: "input",
            message: "What is the title of the new role?",
        },
        {
            name: "salaryRole",
            type: "input",
            message: "What is the salary amount (insert whole number plus two decimal places)",
        },
        {
            name: "departmentId",
            type: "input",
            message: "What is the department id that corresponds with the role?",
        },
        ]).then ((answer) => {
        connection.query (
            "INSERT INTO roles SET ?",
        {
            title: answer.titleRole,
            salary: answer.salary,
            department_id: answer.departmentId,
        },
        (err) => {
            if (err) throw err;
            console.table ("You have sucessfully added a new role!");
            runSearch();
        }
        );
    });
};

    // This function is to view all employees 
const viewAllEmployees = () => {
    let query = " Select * FROM employee ";
    connection.query (query, function (err, res){
        console.table("All Employees", res);
        runSearch();
    })
};

    // This function is to view all departments
const viewAllDepartments = () => {
    let query = " SELECT * FROM department ";
    connection.query (query, function (err, res){
        console.table("All Departments", res);
        runSearch();
    })
};

    // This function is to view all roles
const viewAllRoles = () => {
    let query = " SELECT * FROM Roles ";
    connection.query (query, function (err, res){
        console.table("All Roles", res);
        runSearch();
    })
};

    // This function is to view all employees be department. LEFT JOIN is needed 
const viewEmployeesByDepartment = () => {
    let query = "Select * FROM employee LEFT JOIN roles on roles.id = employee.role_id LEFT JOIN department on roles.department_id = department.id";
    connection.query (query, (err, res) => {
        console.table ("View Employees by Department", res);
        runSearch();
    })
};

    // This function is to view all employees by manager. LEFT JOIN is needed
const viewAllEmployeesByManager = () => {
    const query = "SELECT * FROM employee LEFT JOIN roles on roles.id = employee.role_id LEFT JOIN manager on employee.manager_id = manager.id";
    connection.query (query, (err, res) => {
        console.table ("Employees by Manager", res);
        runSearch();
    })
};

    // To exit the database
function endSession () {
    console.log('You have now ended session. Thank you for using the employee tracker database');
    connection.end();
};









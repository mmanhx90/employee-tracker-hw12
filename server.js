const mysql = require("mysql2")
const inquirer = require("inquirer");
const { default: Choices } = require("inquirer/lib/objects/choices");


const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'lavender',
    database: 'movies_db'
  },
  console.log(`Connected to the movies_db database.`)
);

const initialQuestion = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "start",
      message: "What would you like to do?",

      choices:
        ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
    }
  ]).then(answers => {
    switch (answers.start) {

      case "View All Employees":
        viewAllEmployees()
        break;

      case "Add Employee":
        addEmployee()
        break;

      case "Update Employee Role":
        updateEmployeeRole()
        break;

      case "View All Roles":
        viewAllRoles()
        break;

      case "Add Role":
        addRole()
        break;

      case "View All Departments":
        viewAllDepartments()
        break;

      case "Add Department":
        addDepartment()
        break;

      case "Quit":
        quit()
        break;
    }
  })
};

function viewAllEmployees() {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      console.table(result)
      initialQuestion()
    }
  })
};
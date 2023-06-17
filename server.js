const mysql = require("mysql2")
const inquirer = require("inquirer");



const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Rocket$!1',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
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

function viewAllRoles() {
  db.query("SELECT * FROM role", (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      console.table(result)
      initialQuestion()
    }
  })
};

function viewAllDepartments() {
  db.query("SELECT * FROM department", (err, result) => {
    if (err) {
      console.log(err)
    }
    else {
      console.table(result)
      initialQuestion()
    }
  })
};

function addRole() {
  db.promise().query("SELECT department.department_name, department.id FROM department")
    .then(([res]) => {
      inquirer.prompt([
        {
          type: "input",
          message: "What is the name of this role?",
          name: "newRole"
        },
        {
          type: "input",
          message: "What is the salary of this role?",
          name: "salary",
        },
        {
          type: "list",
          message: "What department does this role belong to?",
          name: "owner",

          choices: [{ name: "Engineering", value: "1" }, { name: "Finance", value: "2" }, { name: "Legal", value: "3" }, { name: "Sales", value: "4" }],
        },
      ]).then(answers => {
        const role = {
          title: answers.newRole, salary: answers.salary, department_id: answers.owner
        }
        console.log(answers)
        initialQuestion();
      })
    })
};

function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "lastName",
    },
    {
      type: "input",
      message: "What is this employee's role?",
      name: "role",
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "manager",

      choices: ["Colton Smith", "Blake Hargens", "Natasha Smith", "Nathan Henderson"]
    },
  ])
  .then(

    answers => {
      const sql = `INSERT INTO employees (first_name, last_name)
    VALUES (?)`;
      const params = [answers.first_name, answers.last_name]
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          initialQuestion()
        };
      });
    }
  )
};


initialQuestion();
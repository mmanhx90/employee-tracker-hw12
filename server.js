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
      message: "Which department does this role belong to?",
      name: "owner",

      choices: [{ name: "Engineering", value: "1" }, { name: "Finance", value: "2" }, { name: "Legal", value: "3" }, { name: "Sales", value: "4" }],
    },
  ]).then(
    answers => {
      const sql = "INSERT INTO role (title,salary,department_id) VALUES (?,?,?)"
      db.query(sql, [answers.newRole, answers.salary, parseInt(answers.owner)], (err, res) => {
        if (err) {
          console.log(err)
        }
        console.log("role has been added")
      })
      console.log(answers)
      initialQuestion();
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
      type: "list",
      message: "What is this employee's role?",
      name: "role",

      choices: [{ name: "Sofware Engineer", value: "1" }, { name: "Accountant", value: "2" }, { name: "Lawyer", value: "3" }, { name: "Sales Representitive", value: "4" }]
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "manager",

      choices: [{name: "Michael Manhxaythavong", value: "1"},{ name: "Colton Smith", value: "2" }, {name: "Nathan Henderson", value: "3"}, { name: "Blake Hargens", value: "4" }]
    },
  ]).then(
    answers => {
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
      const params = [answers.firstName, answers.lastName, parseInt(answers.role), parseInt(answers.manager)]
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          console.log("employee added")
          initialQuestion()
        };
      });
    }
  )
};

function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "department",
    },
  ]).then(
    answers => {
      const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
      const params = [answers.department]
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

function updateEmployeeRole() {
  inquirer.prompt([
    {
      type: "list",
      message: "Which employee's role do you want update?",
      name: "update",

      choices: [{name: "Michael Manhxaythavong", value: "1"},{ name: "Colton Smith", value: "2" }, {name: "Nathan Henderson", value: "3"}, { name: "Blake Hargens", value: "4" }]
    },
    {
      type: "list",
      message: "Which role do you want to assign the selected employee?",
      name: "selectDepartment",

      choices: [{ name: "Sofware Engineer", value: "1" }, { name: "Accountant", value: "2" }, { name: "Lawyer", value: "3" }, { name: "Sales Representitive", value: "4" }]
    }
  ]).then(
    answers => {
      const sql = "UPDATE employees SET role_id = ? WHERE id = ?";
      const params = [answers.update, answers.selectDepartment]
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          initialQuestion()
        }
      })
    }
  )
};



initialQuestion();
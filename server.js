const express = require('express');
const { Pool } = require('pg');
const inquirer=require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    user: 'postgres',
    password: '',
    host: 'localhost',
    database: 'bowner_db'
  },
  //console.log(`Connected to the books_db database.`)
)

pool.connect();

function grabDepartment(){
  let department=
}

function addRole(){
  let title;
  let salary;
  let department=[];
  pool.query('SELECT * FROM department;', function (err, res) {
    for (let index = 0; index < res.rows.length; index++) {
      const element = res.rows[index];
      department.push(element.dep_name);
     }
  });
  inquirer
  .prompt([
    {
      type:'input',
      message: "What is the title of this role?",
      name: "roleTitle"
    },
    {
      type:'input',
      message: "How much is the salary?",
      name: "roleSalary"
    },
    {
      type:'list',
      message: "What department does this take place in?",
      name: "roleDepartment",
      choices: department
    }

  ])
  .then((response)=> {
    let departmentNum=String(response.roleDepartment).substring(0,1);
    console.log(`we are going add the role ${response.roleTitle} with a salary of ${response.roleSalary} in the department ${departmentNum}`);
    pool.query(`INSERT INTO roles(title,salary,department) VALUES ('${response.roleTitle}',${response.roleSalary},${departmentNum});`)
  })
}

function updateRole(){
  let roleRoster=[];
  pool.query('SELECT * FROM roles;', function (err, res) {
    for (let index = 0; index < res.rows.length; index++) {
      const element = res.rows[index];
      roleRoster.push(element);
     }
  })
}

inquirer
.prompt([

    {
        type: 'list',
        message: 'what would you like to do',
        name: 'managerAction',
        choices:['View employees','Add Employees','Update Employees','View all Roles','Add Role','View all departments','Add Departments']
    }
  
])
.then((response)=> {
    console.log(`you chose ${response.managerAction}`)

    if (response.managerAction == 'View employees'){
        
    pool.query('SELECT * FROM employee;', function (err, res) {
      console.log(res.rows);
    });
    }
    else if (response.managerAction == 'Add Employees'){
   
    }
    else if (response.managerAction == 'Update Employee'){

    }
    else if (response.managerAction == 'View all Roles'){



      pool.query('SELECT * FROM roles;', function (err, res) {
        console.log(res.rows);
      });

    }
    else if (response.managerActi
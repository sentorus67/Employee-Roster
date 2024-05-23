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
  let department=[];
  pool.query('SELECT * FROM department;', function (err, res) {
    for (let index = 0; index < res.rows.length; index++) {
      const element = res.rows[index];
      department.push(JSON.stringify(element));
     }
  })
  return department;
}

function grabRole(){
  let roleRoster=[];
  pool.query('SELECT * FROM roles;', function (err, res) {
    for (let index = 0; index < res.rows.length; index++) {
      const element = res.rows[index];
      roleRoster.push(JSON.stringify(element));
    }
  })
  return roleRoster;
}

function grabEmployee(){
  pool.query('SELECT * FROM employee;', function (err, res) {
    for (let index = 0; index < res.rows.length; index++) {
      console.log(res.rows.length);
      const element = res.rows[index]
      console.log(element)
      employeeRoster.push(JSON.stringify(element))
    }
    return employeeRoster;
  })
  //return employeeRoster;
}

function addRole(){
 
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
      choices: grabDepartment()
    }

  ])
  .then((response)=> {
    let departmentNum=JSON.parse(response.roleDepartment);

    //let departmentNum=String(response.roleDepartment).substring(0,1);
    console.log(`we are going add the role ${response.roleTitle} with a salary of ${response.roleSalary} in the department ${departmentNum.id}`);
    pool.query(`INSERT INTO roles(title,salary,department) VALUES ('${response.roleTitle}',${response.roleSalary},${departmentNum.id});`)
  })
}

function addDepartment(){
  let totalDep=grabDepartment();
  inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the name of the new Department',
      name: 'departmentName'
    }
  ])
  .then((response)=>{
    totalDep= (totalDep.length+1)+':';
    newDepartment=(totalDep)+response.departmentName;

    console.log(`Adding ${newDepartment} to the the list of departments`)
    pool.query(`INSERT INTO department(dep_name) VALUES ('${newDepartment}');`)
  }
  
  )
}

function addEmployee(){

  inquirer
  .prompt([
    {
      type:'input',
      message: "What is the first name of the employee?",
      name: "employeeFName"
    },
    {
      type:'input',
      message: "What is the last name of the employee?",
      name: "employeeLName"
    },
    {
      type: 'input',
      message: 'What is their manager id(enter 1-3)?',
      name: 'employeeManId'
    },
    {
      type:'list',
      message: "What is there role in the company?",
      name: "roleDepartment",
      choices: grabRole()
    }

  ])
  .then((response)=> {
    let depart=JSON.parse(response.roleDepartment)
    console.log(`the deparment is ${depart.title}`);
    
   console.log(`we are going add the Employee ${response.employeeFName} ${response.employeeLName} to the role number ${depart.id}`);
    pool.query(`INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES ('${response.employeeFName}','${response.employeeLName}',${depart.id},${response.employeeManId});`)
  })

}


function updateEmployee(){
let employeeRoster=[];

  pool.query('SELECT * FROM employee;', function (err, res) {
    for (let index = 0; index < res.rows.length; index++) {
      console.log(res.rows.length);
      const element = res.rows[index]
      console.log(element)
      employeeRoster.push(JSON.stringify(element))
    }
    

  inquirer
  .prompt([
    {
      type: 'list',
      message: 'Choose the employee to update',
      name: 'roleUpdate',
      choices: employeeRoster
    }
  ])
  .then((response1) =>{
    employeeUpdater=JSON.parse(response1.roleUpdate);

    inquirer
    .prompt([ 
      {
        type: 'input',
        message: `Does ${employeeUpdater.first_name} have a new first name?`,
        name: 'empFName'
      },
      {
        type: 'input',
        message: `Does ${employeeUpdater.first_name} have a new last name? (previously ${employeeUpdater.last_name})`,
        name: 'empLName'
      },
      {
        type: 'list',
        message: 'What is there new role in the company?',
        name: 'newRole',
        choices: grabRole()
      }

    ])
    .then((response2)=>{
      let roleUpdate=JSON.parse(response2.newRole);
      console.log(`${employeeUpdater.first_name} ${employeeUpdater.last_name} will be updated to ('${response2.empFName}',${response2.empLName}) with the role of ${roleUpdate.id})`);
      pool.query(`UPDATE employee SET first_name ='${response2.empFName}', last_name='${response2.empLName}', role_id='${roleUpdate.id}' WHERE id='${employeeUpdater.id}';`);
    })
  } )
}) 
};

inquirer
.prompt([

    {
        type: 'list',
        message: 'what would you like to do',
        name: 'managerAction',
        choices:['View employees','Add Employees','Update Employee','View all Roles','Add Role','View all departments','Add Departments']
    }
  
])
.then((response)=> {
    console.log(`you chose ${response.managerAction}`)

    if (response.managerAction == 'View employees'){
        
    pool.query('SELECT * FROM employee ORDER BY id;', function (err, res) {
      console.log(res.rows);
    });

    }
    else if (response.managerAction == 'Add Employees'){
      addEmployee();
    }
    else if (response.managerAction == 'Update Employee'){
      updateEmployee();
    }
    else if (response.managerAction == 'View all Roles'){
 
      pool.query('SELECT * FROM roles;', function (err, res) {
        console.log(res.rows);
      });

    }
    else if (response.managerAction == 'Add Role'){
      addRole();
    }
    else if (response.managerAction == 'View all departments'){
      pool.query('SELECT * FROM department;', function (err, res) {
        console.log(res.rows);
      });
     
    }
    else if (response.managerAction == 'Add Departments'){
      addDepartment();
    }
});
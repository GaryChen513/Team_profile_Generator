const fs = require("fs");
const Lib = require("./lib/Employees");
const Manager = Lib.Manager;
const Engineer = Lib.Engineer;
const Intern = Lib.Intern;
const inquirer = require("inquirer");

class App {
  constructor() {
    this.employees = new Array();
    this.promptInfo = [
      {
        type: "list",
        message: "Enter your role",
        name: "role",
        choices: ["Manager", "Engineer", "Intern", "Exit"],
      },
      {
        type: "input",
        message: "What is your name ?",
        name: "name",
        when: (data) => data.role != "Exit",
        validate: name => {
          if (name) {
            return true;
          } else {
            console.log("Name should not be blank, please enter your name")
            return false
          }
        }
      },
      {
        type: "input",
        message: "What is your ID ?",
        name: "id",
        when: (data) => data.role != "Exit",
        validate: id => {
          if (id) {
            return true
          } else {
            console.log("Id should not be blank, please enter a id number")
            return false
          }
        }
      },
      {
        type: "input",
        message: "What is your email ?",
        name: "email",
        when: data => data.role != "Exit",
        validate: email => {
          if (email) {
            return true
          } else {
            console.log("Email should not be blank, please enter a email");
            return false;
          }
        }
      },
      {
        type: "input",
        message: "What is your office number ?",
        name: "officeNumber",
        when: data => data.role == "Manager",
        validate: officeNumber => {
          if (officeNumber) {
            return true
          } else {
            console.log("Office number should not be blank");
            return false
          }
        }
      },
      {
        type: "input",
        message: "What is your github ?",
        name: "github",
        when: data => data.role == "Engineer",
        validate: github => {
          if (github) {
            return true
          } else {
            console.log("Github should not be blank, please enter a github account")
            return false
          }
        }
      },
      {
        type: "input",
        message: "What is your school ?",
        name: "school",
        when: data => data.role == "Intern",
        validate: school => {
          if (school) {
            return true
          } else {
            console.log("School should not be blank, please enter a school");
            return false;
          }
        }
      }];
  }

  start() {
    this.createEmployee()
  }

  // a new Employee can be created by directly appending a new Employee() to this.employees. 
  createEmployee() {
    inquirer.prompt(this.promptInfo).then(data => {
      switch (data.role) {
        case "Exit":
          this.renderHTML();
          console.log("Team profile has generated");
          break
        case "Manager":
          this.employees.push(new Manager(data.name, data.id, data.email, data.officeNumber));
          this.createEmployee();
          break
        case "Engineer":
          this.employees.push(new Engineer(data.name, data.id, data.email, data.github));
          this.createEmployee();
          break
        case "Intern":
          this.employees.push(new Intern(data.name, data.id, data.email, data.school));
          this.createEmployee();
          break
      }
    });
  }

  renderHTML() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Team Portfolio</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    
    <body>
      <div class="jumbotron jumbotron-fluid bg-warning text-white" style="padding: 0;">
        <div class="container d-flex justify-content-center">
          <h1 class="display-4 ">My Team</h1>
        </div>
      </div>
      <div class="container">
        <div class="row justify-content-center" id="cards">
        ${this.renderTeam()}
          
        </div>
      </div>
    
    </body>
    
    </html>`

    fs.writeFile("./index.html", html, (err) => {
      if (err) throw err;
      console.log("HTML generated !")
    })
  }

  renderTeam() {
    let script = ``;
    this.employees.forEach(e => {
      const employeeHTML = this.renderEmployee(e)
      script += employeeHTML;
    });

    return script
  }

  renderEmployee(e) {
    let field;
    let iconClass;
    switch (e.getRole()) {
      case "Manager":
        field = `Office Number: <div>${e.officeNumber}</div>`;
        iconClass = "user-tie";
        break
      case "Engineer":
        field = `Github: <div><a href="https://github.com/${e.github}" target="_blank" rel="noopener noreferrer">${e.github}</a></div>`;
        iconClass = "user-cog";
        break
      case "Intern":
        field = `School: <div>${e.school}</div>`
        iconClass = "user-graduate"
        break
    };

    const eHTML = `
    <div class="col-3 m-1">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <div class="h4">${e.name}</div>
          <div><i class="fas fa-${iconClass}"></i> ${e.getRole()}</div>
        </div>
        <div class="card-body">
          <ul class="list-group ">
            <li class="list-group-item">ID: ${e.id}</li>
            <li class="list-group-item">Email: <div><a href="mailto:${e.email}">${e.email}</a></div></li>
            <li class="list-group-item">${field}</li>
          </ul>
        </div>
      </div>
    </div>`

    return eHTML
  }

}

const app = new App();
app.start();
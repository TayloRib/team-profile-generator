const inquirer = require("inquirer");
const fs = require("fs");
const team = require("./Develop/util/generateHtml")

const Intern = require("./Develop/lib/Intern");
const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Employee = require("./Develop/lib/Employee");

const manager =[];
const engineer = [];
const intern = [];


function askQuestion() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is your employee ID?",
            name: "eid",
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your office phone number?",
            name: "phone",
        },
        {
            type: "list",
            name: "addmenu",
            choices: ["Add an Engineer", "Add an Intern", "Finish Team"]
        }
    ]).then( addManagerAnswers => {
        const emp = new Manager(addManagerAnswers.name, "Manager", addManagerAnswers.eid, addManagerAnswers.email, addManagerAnswers.phone);
        manager.push(emp);


        switch (addManagerAnswers.addmenu) {
            case "Add an Engineer":
                console.log("add Engineer")
                addEngineer();
                break;

            case "Add an Intern":
                console.log("add Intern")
                addIntern();
                break;

            case "Finish Team":
                console.log("Team finalized");
                writeHtml();
                break;
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employees name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employees ID?",
            name: "eid",
        },
        {
            type: "input",
            message: "What is the employees email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the employees GitHub username?",
            name: "github"
        },
        {
            type: "list",
            name: "addmenu",
            choices: ["Add another Engineer", "Add an Intern", "Finish Team"]
        }
    ]).then( addEngineerAnswers => {
        const emp = new Engineer(addEngineerAnswers.name, "Engineer", addEngineerAnswers.eid, addEngineerAnswers.email, addEngineerAnswers.github);
        engineer.push(emp);

        switch (addEngineerAnswers.addmenu) {
            case "Add another Engineer":
                console.log("add Engineer")
                addEngineer();
                break;

            case "Add an Intern":
                console.log("add Intern")
                addIntern();
                break;

            case "Finish Team":
                console.log("Team finalized");
                writeHtml();
                break;
        }
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the employees name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the employees ID?",
            name: "eid",
        },
        {
            type: "input",
            message: "What is the employees email?",
            name: "email"
        },
        {
            type: "input",
            message: "What school do they attend?",
            name: "school"
        },
        {
            type: "list",
            name: "addmenu",
            choices: ["Add an Engineer", "Add another Intern", "Finish Team"]
        }
    ]).then( addInternAnswers => {
        const emp = new Intern(addInternAnswers.name, "Intern", addInternAnswers.eid, addInternAnswers.email, addInternAnswers.school);
        intern.push(emp);

        switch (addInternAnswers.addmenu) {
            case "Add an Engineer":
                console.log("add Engineer")
                addEngineer();
                break;

            case "Add another Intern":
                console.log("add Intern")
                addIntern();
                break;

            case "Finish Team":
                console.log("Team finalized");
                writeHtml();
                break;
        }
    })
}

askQuestion()

const generateTeam = team => {

    // create the manager html
    const generateManager = manager => {
        return `
        <div class="card employee-card  m-3">
        <div class="card-header">
            <h2 class="card-title">${manager.name}</h2>
            <h3 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.position}</h3>
        </div>
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item">ID: ${manager.eid}</li>
                <li class="list-group-item">Email: <a href="mailto:${manager.email}">${manager.email}</a></li>
                <li class="list-group-item">Office number: <a href="tel:${manager.phone}">${manager.phone}</a></li>
            </ul>
        </div>
    </div>
        `;
    };

    // create the html for engineers
    const generateEngineer = engineer => {
        return `
        <div class="card employee-card  m-3">
    <div class="card-header">
        <h2 class="card-title">${engineer.name}</h2>
        <h3 class="card-title"><i class="fas fa-glasses mr-2"></i>${engineer.position}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${engineer.eid}</li>
            <li class="list-group-item">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></li>
            <li class="list-group-item">GitHub: <a href="https://github.com/${engineer.github}" target="_blank" rel="noopener noreferrer">${engineer.github}</a></li>
        </ul>
    </div>
</div>
        `;
    };

    // create the html for interns
    const generateIntern = intern => {
        return `
        <div class="card employee-card  m-3">
    <div class="card-header">
        <h2 class="card-title">${intern.name}</h2>
        <h3 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${intern.position}</h3>
    </div>
    <div class="card-body">
        <ul class="list-group">
            <li class="list-group-item">ID: ${intern.eid}</li>
            <li class="list-group-item">Email: <a href="mailto:${intern.email}">${intern.email}</a></li>
            <li class="list-group-item">School: ${intern.school}</li>
        </ul>
    </div>
</div>
        `;
    };

    const html = [];

    html.push(manager
        .map(manager => generateManager(manager))
    );
    html.push(engineer
        .map(engineer => generateEngineer(engineer))
        .join("")
    );
    html.push(intern
        .map(intern => generateIntern(intern))
        .join("")
    );

    return html.join("");

}

function writeHtml() {
    fs.writeFile("index.html", 

                `<!DOCTYPE html>
            <html lang="en">
            
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <title>My Team</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                <link rel="stylesheet" href="style.css">
                <script src="https://kit.fontawesome.com/c502137733.js"></script>
            </head>
            
            <body>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 jumbotron mb-3 team-heading">
                            <h1 class="text-center">My Team</h1>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="team-area col-12 d-flex justify-content-center">
                            ${generateTeam(team)}
                        </div>
                    </div>
                </div>
            </body>
            </html>
            </div>
            </div>
        </div>
    </body>
    </html>`
    
    , (err) =>
    err ? console.error(err) : console.log('Success!')
    );
}


                


// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Engineer extends Employee {
    constructor (name, position, eid, email, github){
        super(name, position, eid, email);
        this.github = github;
    }
}

module.exports = Engineer
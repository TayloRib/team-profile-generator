// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee {
    constructor (name, position, eid, email, school){
        super(name, position, eid, email);
        this.school = school;
    }
}

module.exports = Intern
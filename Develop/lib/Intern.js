const Employee = require("./Employee");

class Intern extends Employee {
    constructor (name, position, eid, email, school){
        super(name, position, eid, email);
        this.school = school;
    }
}

module.exports = Intern
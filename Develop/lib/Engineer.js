const Employee = require("./Employee");

class Engineer extends Employee {
    constructor (name, position, eid, email, github){
        super(name, position, eid, email);
        this.github = github;
    }
}

module.exports = Engineer
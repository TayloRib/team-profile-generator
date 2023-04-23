// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manager extends Employee {
    constructor (name, position, eid, email, phone){
        super(name, position, eid, email);
        this.phone = phone;
    }
}

module.exports = Manager
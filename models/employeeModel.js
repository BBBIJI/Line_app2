const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    username : String,
    password : String
});

const Employee = mongoose.model('employees',employeeSchema);

module.exports = Employee;
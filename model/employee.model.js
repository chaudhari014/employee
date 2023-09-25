const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  department: String,
  salary: Number,
});

const employeeModel = mongoose.model("rahul", userSchema);

module.exports = { employeeModel };

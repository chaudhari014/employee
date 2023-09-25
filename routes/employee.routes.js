const express = require("express");
const employeeRoute = express.Router();
const {
  getEmployee,
  deleteEmployee,
  updateEmployee,
  postEmployee,
} = require("../controller/employee.controller");
employeeRoute.get("/employees", getEmployee);
employeeRoute.post("/employees", postEmployee);
employeeRoute.delete("/employees/:id", deleteEmployee);
employeeRoute.put("/employees/:id", updateEmployee);

module.exports = { employeeRoute };

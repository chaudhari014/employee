const { employeeModel } = require("../model/employee.model");

const getEmployee = async (req, res) => {
  try {
    const { department, order, sort, page, limit } = req.query;
    let filter = {};
    if (department) {
      filter.department = department;
    }
    let sortOption = {};
    if (order) {
      sortOption[sort] = order === "asc" ? 1 : -1;
    }
    if (
      Object.keys(filter).length === 0 &&
      Object.keys(sortOption).length === 0 &&
      !page
    ) {
      const data = await employeeModel.find();
      res.status(200).json({ msg: data });
    } else if (page) {
      const data = await employeeModel
        .find(filter)
        .sort(sortOption)
        .limit(limit)
        .skip((page - 1) * limit);
      res.status(200).json({ msg: data });
    } else {
      const data = await employeeModel.find(filter).sort(sortOption);
      res.status(200).json({ msg: data });
    }
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
const postEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const data = new employeeModel(req.body);
    await data.save();
    console.log(req.body);
    res.status(200).json({ msg: "add successfully" });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await employeeModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "delete successfully" });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await employeeModel.findByIdAndDelete({ _id: id }, req.body);
    res.status(200).json({ msg: "updated successfully" });
  } catch (error) {
    res.status(401).json({ error: error });
  }
};

module.exports = { getEmployee, deleteEmployee, updateEmployee, postEmployee };

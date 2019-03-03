const express = require("express");
const router = express.Router();

const EmployeeController = require("../controllers/employee-controller");

router.post("/upsert", EmployeeController.employeeUpsert);
router.post("/search", EmployeeController.employeeSearch);
router.post("/delete", EmployeeController.employeeDelete);
router.post("/get", EmployeeController.getEmployeeById);
router.post("/update", EmployeeController.updateEmployee);

module.exports = router;
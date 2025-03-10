const Employee = require('../models/Employee');
const mongoose = require('mongoose');

class EmployeeController {
    index(req, res, next) {
        Employee.find({})
            .lean()
            .then((employees) =>
                res.render('employee/employeeProfile.hbs', { employees }),
            )
            .catch(next);
    }

    deleteEmployee(req, res, next) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid Employee ID' });
        }

        Employee.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
            .then(() => res.redirect('/employee'))
            .catch(next);
    }
    //API
    getEmployees(req, res, next) {
        Employee.find({})
            .lean()
            .then((employees) => {
                res.status(200).json(employees);
            })
            .catch((err) => next(err));
    }

    getEmployeesId(req, res, next) {
        Employee.findById(req.params.id)
            .then((employees) => {
                if (!employees) {
                    return res
                        .status(404)
                        .json({ error: 'Employee not found' });
                }
                res.status(200).json(employees);
            })
            .catch((err) => next(err));
    }
}

module.exports = new EmployeeController();

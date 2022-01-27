const db = require('../models');
const utilities = require('./../utilities/utility');
const Department = db.department;

/**
 * Retrieve all information regarding the departments
 */
getAll = async (req, res) => {
    const department = await Department.findAll();
    res.status(200).json(department);
}

/**
 * Retrieve a department with a specified ID.
 */
getById = async (req, res) => {
    const id = req.params.id;

    try {
        const department = await Department.findByPk(id);

        if (department == null || department.length == 0) {
            throw new Error('Unable to find department with id: ' + id);
        }

        res.status(200).json(department);
    }
    catch (e) {
        utilities.formatErrorResponse(res, 400, e.message);
    }
}

/**
 * Upload a new department to the MySQL database.
 */
create = async (req, res) => {
    const department = {
        name: req.body.name,
        description: req.body.description
    };

    let result = '';

    try {
        if (department.name == null || department.description == null) {
            throw new Error('Essential fields missing');
        }

        await Department.create(department)
            .then((response) => {
                result = response;
            });

        res.status(201).json(result);
    }
    catch (e) {
        utilities.formatErrorResponse(res, 400, e.message);
    }
}

/**
 * Disband/delete a department and the underlying workstations from the MySQL database.
 */
disband = async (req, res) => {
    const id = req.body.id;

    try {
        const deleted = await Department.destroy({
            where: {
                id: id
            }
        });

        if (deleted == 0) {
            throw new Error("ID not found");
        }

        let jsonPayload = {
            "id_deleted": id
        }

        // Send back the ID of the deleted department so it can removed from the web app's cache.
        res.status(200).send(jsonPayload);
    }
    catch (e) {
        utilities.formatErrorResponse(res, 404, e.message);
    }
}

update = async (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const description = req.body.description;

    try {
        if (id == null || name == null || description == null) {
            throw new Error('Missing essential fields');
        }

        // Check if an entry exists and return it.
        const department = await Department.findOne({ where: { id: id }});

        // if the entry does not exist, issue error.
        if (!department) {
            throw new Error('Department with the ID: ' + id + ' cannot be found');
        }

        // Update fields.
        department.id = id;
        department.name = name;
        department.description = description;

        // Save changes to the model.
        await department.save();

        res.status(200).json(department);
    }
    catch (e) {
        utilities.formatErrorResponse(res, 404, e.message);
    }
}

module.exports = { getAll, getById, create, disband, update };
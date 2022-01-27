const db = require('../models');
const utilities = require('./../utilities/utility');
const Workstation = db.workstation;
const Department = db.department;

/**
 * Retrieve all information regarding the workstations
 */
getAll = async (req, res) => {
    const workstation = await Workstation.findAll();

    res.status(200).json(workstation);
}

/**
 * Retrieve a workstation with a specified ID.
 */
getById = async (req, res) => {
    const id = req.params.id;

    try {
        const workstation = await Workstation.findOne({
            where: {
                id: id
            },
            include: [{
                model: Department,
                required: true
            }]
        });

        if (workstation == null || workstation.length == 0) {
            throw new Error('Unable to find workstation with id: ' + id);
        }

        res.status(200).json(workstation);
    }
    catch (e) {
        utilities.formatErrorResponse(res, 400, e.message);
    }
}

/**
 * Retrieve all workstations for a specific department.
 */
getByDepartment = async (req, res) => {
    const id = req.params.id;

    try {
        const workstation = await Workstation.findAll({
            where: {
                department_id: id
            }
        });

        if (workstation == null || workstation.length == 0) {
            throw new Error('Unable to find workstations with department id: ' + id);
        }

        res.status(200).json(workstation);
    }
    catch (e) {
        utilities.formatErrorResponse(res, 400, e.message);
    }
}

/**
 * Upload a new workstation to the MySQL database.
 */
create = async (req, res) => {
    const workstation = {
        name: req.body.name,
        type: req.body.type,
        ip_address: req.body.ip_address,
        cpu: req.body.cpu,
        motherboard: req.body.motherboard,
        ram: req.body.ram,
        hdd: req.body.hdd,
        ssd: req.body.ssd,
        conn_type: req.body.conn_type,
        department_id: req.body.department_id
    };


    let result = '';

    try {
        if (workstation.name == null || workstation.type == null || workstation.ip_address == null || workstation.cpu == null || workstation.motherboard == null || workstation.ram == null || workstation.hdd == null || workstation.ssd == null || workstation.conn_type == null || workstation.department_id == null) {
            throw new Error('Essential fields missing');
        }

        await Workstation.create(workstation)
            .then((response) => {
                result = response;
            });

            console.log(result)

        res.status(201).json(result);
    }
    catch (e) {
        utilities.formatErrorResponse(res, 400, e.message);
    }
}

/**
 * Disband/delete a workstation from the MySQL database.
 */
disband = async (req, res) => {
    const id = req.body.id;

    try {
        const deleted = await Workstation.destroy({
            where: {
                id: id
            }
        });

        if (deleted == 0) {
            throw new Error('ID not found');
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

/**
 * Update the information of a specific workstation.
 */
update = async (req, res) => {
    const id = req.body.id;

    const workstation = {
        name: req.body.name,
        type: req.body.type,
        ip_address: req.body.ip_address,
        cpu: req.body.cpu,
        motherboard: req.body.motherboard,
        ram: req.body.ram,
        hdd: req.body.hdd,
        ssd: req.body.ssd,
        conn_type: req.body.conn_type,
        department_id: req.body.department_id
    };

    try {
        if (id == null || workstation.name == null || workstation.type == null || workstation.ip_address == null || workstation.cpu == null || workstation.motherboard == null || workstation.ram == null || workstation.hdd == null || workstation.ssd == null || workstation.conn_type == null || workstation.department_id == null) {
            throw new Error('Missing essential fields');
        }

        // Check if the record exists and store the result.
        const record = await Workstation.findOne({ where: { id: id }});

        // If record does not exist, issue error.
        if (!record) {
            throw new Error('Workstation with the IS: ' + id + ' cannot be found');
        }

        // Update fields
        record.id = id;
        record.name = workstation.name;
        record.type = workstation.type;
        record.ip_address = workstation.ip_address;
        record.cpu = workstation.cpu;
        record.motherboard = workstation.motherboard;
        record.ram = workstation.ram;
        record.hdd = workstation.hdd;
        record.ssd = workstation.ssd;
        record.conn_type = workstation.conn_type;
        record.department_id = workstation.department_id;

        // Save changes to the model.
        await record.save();

        res.status(200).json(record);
    }
    catch (e) {
        utilities.formatErrorResponse(res, 404, e.message)
    }
}

module.exports = { getAll, getById, getByDepartment, create, disband, update };
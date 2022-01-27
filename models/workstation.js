/**
 * A Sequelize model representing the workstation table.
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @param {*} department 
 * @returns Workstation
 */
module.exports = (sequelize, Sequelize, department) => {
    const Workstation = sequelize.define("workstation", {
        id :{
            type: Sequelize.INTEGER,
            primaryKey: true,
            field: 'id',
            autoIncrement: true
        },
        type: {
            type: Sequelize.STRING,
            field: 'type'
        },
        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        ip_address: {
            type: Sequelize.STRING,
            field: 'ip_address'
        },
        cpu: {
            type: Sequelize.STRING,
            field: 'cpu'
        },
        motherboard: {
            type: Sequelize.STRING,
            field: 'motherboard'   
        },
        ram: {
            type: Sequelize.STRING,
            field: 'ram'
        },
        hdd: {
            type: Sequelize.STRING,
            field: 'hdd'
        },
        ssd: {
            type: Sequelize.STRING,
            field: 'ssd'
        },
        conn_type: {
            type: Sequelize.STRING,
            field: 'conn_type'
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'tbl_workstations'
    });

    Workstation.belongsTo(department, {
        foreignKey: 'department_id'
    });

    return Workstation;
}
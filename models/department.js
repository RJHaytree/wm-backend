/**
 * A Sequelize model representing the department table
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns Department
 */
module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define("department", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            field: 'id',
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        description: {
            type: Sequelize.STRING,
            field: 'description'
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'tbl_departments',
        onDelete: 'CASCADE'
    });

    return Department;
}
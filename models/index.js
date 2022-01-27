const config = require('config');
const Department = require('./department');
const Workstation = require('./workstation');
const Sequelize = require('sequelize');

// Instantiate Sequelize passing in database configuration settings.
const sequelize = new Sequelize(
    config.get('database.db_name'),
    config.get('database.uid'),
    config.get('database.pass'), {
        host: config.get('database.host'),
        dialect: config.get('database.dialect'),
        port: config.get('database.port')
    });

//Authenticate the Sequeliza instance and debug for auth issues.
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection established');
    })
    .catch(e => {
        console.error('Unable to form connection: ', e);
    });

// Instantiate an empty object to act as a datastore
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Amend instances of the models to the datastore for allow other areas of the application
// to access them.
db.department = Department(sequelize, Sequelize);
db.workstation = Workstation(sequelize, Sequelize, db.department);

module.exports = db;
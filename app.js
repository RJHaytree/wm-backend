// Import dependencies and libraries.
const express = require('express');
const logger = require('morgan');
const deptRouter = require('./routes/deptRoutes');
const worksRouter = require('./routes/worksRoutes');
const cors = require('cors');

// Instantiate an instance of Express and allow JSON communication.
const app = express();
app.use(express.json());
app.use(logger('dev'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://orange-dune-069981603.1.azurestaticapps.net/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Locale, Content-Type,Origin,Accept, X-Requested-With, Access-Control-Request-Method,Access-Control-Request-Headers');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

// Setup routes.
app.use('/depts', deptRouter);
app.use('/works', worksRouter)

// Setup fallback route
app.use((req, res) => {
    res.status(404).send("Sorry page not found!");
});

module.exports = app;
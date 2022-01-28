/**
 * Setup a webserver for hosting the RESTful service
 */
const app = require('../app');
const http = require('http');
const config = require('config');

const port = process.env.PORT || config.get('general.port');

app.set('port', port);

const server = http.createServer(app);
server.listen(port);
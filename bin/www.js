/**
 * Setup a webserver for hosting the RESTful service
 */
const app = require('../app');
const http = require('http');
const config = require('config');

const port = config.get('general.port') || 8900;

app.set('port', port);

const server = http.createServer(app);
server.listen(port);
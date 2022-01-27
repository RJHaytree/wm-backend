const controller = require('../controllers/departments');
var express = require('express');
var router = express.Router();

// Setup the GET requests.
router.get('/', controller.getAll);
router.get('/:id', controller.getById);

// Setup POST, DELETE and PUT requests seperately.
router.post('/', controller.create);
router.delete('/', controller.disband);
router.put('/', controller.update);

module.exports = router;
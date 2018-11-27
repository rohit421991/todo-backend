var express = require('express');
var router = express.Router();

var UserController = require('../../controllers/auth.controller');


router.post('/', UserController.createUser);
router.get('/', UserController.getUser);
router.post('/login', UserController.validate);


// Export the Router

module.exports = router;
const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController')
const userValidation = require('../validations/user')
const validator = require('express-joi-validation').createValidator({});

router.post('/register', validator.body(userValidation.registerValidation), function(req, res) {
    UserController.register(req, res)
})

router.post('/login', validator.body(userValidation.loginValidation), function(req, res) {
    UserController.login(req, res)
})

module.exports = router;
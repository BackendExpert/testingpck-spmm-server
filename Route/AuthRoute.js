const express = require('express');
const AuthController = require('../Controller/AuthController');

const router = express.Router();

router.post('/signup', AuthController.signup)
router.post('/signin', AuthController.signin)

module.exports = router;
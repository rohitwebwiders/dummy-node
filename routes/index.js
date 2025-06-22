const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/User/Auth/AuthController');

router.post('/sign-up', AuthController.userRegister);

module.exports = router;
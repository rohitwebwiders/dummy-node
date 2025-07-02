const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/User/Auth/AuthController');

router.post('/sign-up', AuthController.userRegister);
router.post('/sign-in', AuthController.userLogin);

module.exports = router;
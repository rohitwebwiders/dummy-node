const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/User/Auth/AuthController');
const UserController = require('../controllers/User/UserController');
const { authenticateToken } = require('../middleware/authMiddleware');

// user Auth Routes
router.post('/sign-up',  AuthController.userRegister);
router.post('/sign-in', AuthController.userLogin);
router.get('/user/profile', authenticateToken, UserController.getUserProfile);

module.exports = router;
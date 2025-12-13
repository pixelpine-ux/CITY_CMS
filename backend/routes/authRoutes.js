const express = require('express');
const { register, login, refreshToken, logout } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middlewares/validation');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', validateRegister, register);

// POST /api/auth/login
router.post('/login', validateLogin, login);

// POST /api/auth/refresh
router.post('/refresh', refreshToken);

// POST /api/auth/logout
router.post('/logout', logout);

module.exports = router;
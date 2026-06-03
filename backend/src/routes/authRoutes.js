const { Router } = require('express');

const authController = require('../controllers/authController');
const asyncHandler = require('../lib/asyncHandler');

const authRoutes = Router();

authRoutes.post('/register', asyncHandler(authController.register));
authRoutes.post('/login', asyncHandler(authController.login));

module.exports = authRoutes;

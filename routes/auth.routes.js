const express = require('express');
const router = express.Router();
const AuthController = require('./../controllers/auth.controller');
const authMiddleware = require('./../utils/authMiddleware');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/user', authMiddleware, AuthController.getUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const AuthController = require('./../controllers/auth.controller');
const authMiddleware = require('./../utils/authMiddleware');
const imageUpload = require('./../utils/imageUpload');

router.post('/register', imageUpload.single('avatar'), AuthController.register);
router.post('/login', AuthController.login);
router.get('/user', authMiddleware, AuthController.getUser);
router.delete('/logout', authMiddleware, AuthController.logout);

module.exports = router;
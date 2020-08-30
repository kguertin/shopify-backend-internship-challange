const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);

router.get('/signUp', authController.getSignUp);

router.post('/signUp', authController.postSignUp);

module.exports = router;
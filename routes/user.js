const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middlewear/isAuth');

router.get('/', userController.getIndex);

router.get('/userImages', isAuth, userController.getUserImages)

module.exports = router;
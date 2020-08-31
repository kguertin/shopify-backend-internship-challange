const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middlewear/isAuth');

router.get('/', userController.getIndex);

router.get('/userImages', isAuth, userController.getUserImages);

router.get('/addPhoto', isAuth, userController.getAddPhoto);

router.post('/addPhoto', isAuth, userController.postAddPhoto);

module.exports = router;
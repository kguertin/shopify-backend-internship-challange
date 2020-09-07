const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const isAuth = require('../middlewear/isAuth');

router.get('/', userController.getIndex);

router.get('/userImages', isAuth, userController.getUserImages);

router.get('/userImages/:imageId', userController.getUserImage);

router.get('/addPhoto', isAuth, userController.getAddPhoto);

router.post('/addPhoto', isAuth, userController.postAddPhoto);

router.get('/manageUserImages', isAuth, userController.getManageImages);

router.post('/updateStatus', isAuth, userController.postUpdateStatus);

router.post('/deleteImage', isAuth, userController.postDeleteImage);

router.get('/editImage', isAuth, userController.getEditImage);

router.post('/editImage', isAuth, userController.postEditImage)

router.post('/bulkOperation', isAuth, userController.postBulkOperation);

module.exports = router;
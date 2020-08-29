const express = require('express');
const { Router } = require('express');
const router = express.Router();

const userController = require('../controllers/image');

router.get('/', userController.getIndex);

module.exports = router;
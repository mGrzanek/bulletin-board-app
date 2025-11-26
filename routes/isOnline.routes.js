const express = require('express');
const router = express.Router();
const OnlineController  = require('./../controllers/online.controller');

router.get('/isOnline', OnlineController.getOnline);

module.exports = router;
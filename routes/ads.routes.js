const express = require('express');
const router = express.Router();
const AdsController = require('./../controllers/ads.controller');
const authMiddleware = require('./../utils/authMiddleware');
const imageUpload = require('./../utils/imageUpload');

router.get('/ads', AdsController.getAll);
router.get('/ads/search/:searchPhrase', AdsController.getSearchPhrase);
router.get('/ads/:id', AdsController.getOne);
router.post('/ads', authMiddleware, imageUpload.single('image'), AdsController.addNew);
router.put('/ads/:id', authMiddleware, imageUpload.single('image'), AdsController.editOne);
router.delete('/ads/:id', authMiddleware, AdsController.removeOne);

module.exports = router;
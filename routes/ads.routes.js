const express = require('express');
const router = express.Router();
const AdsController = require('./../controllers/ads.controller');

router.get('/ads', AdsController.getAll);
router.get('/ads/search/:searchPhrase', AdsController.getSearchPhrase);
router.get('/ads/:id', AdsController.getOne);
router.post('/ads', AdsController.addNew);
router.put('/ads/:id', AdsController.editOne);
router.delete('/ads/:id', AdsController.removeOne);

module.exports = router;
const express = require('express')
const router = express.Router();
const urlController = require('../controller/URLcontroler')

router.get('/getId', urlController.getUserID);

router.post('/generateShortURL/:id', urlController.generateShortURL);

router.get('/all/:id', urlController.getAll);

router.get('/:id', urlController.redirectUrl);

module.exports = router;
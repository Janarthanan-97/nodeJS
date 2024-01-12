const express = require('express')
const itemControler = require('../controller/itemControler')

const router = express.Router();

router.post('/addItem', itemControler.addItem)
router.get('/getItem', itemControler.getItem)
router.put('/updateItem', itemControler.updateItem)
router.put('/deleteItem', itemControler.deleteItem)

module.exports = router
const express = require('express')
const orderControler = require('../controller/orderControler')

const router = express.Router();

router.put('/getOrder', orderControler.getOrder)
router.post('/addOrder', orderControler.addOrder)






module.exports = router
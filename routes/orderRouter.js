const express = require('express')
const orderControler = require('../controller/orderControler')

const router = express.Router();

router.put('/getOrder', orderControler.getOrder)
router.post('/addOrder', orderControler.addOrder)
router.get('/getAllOrder', orderControler.getAllOrder)






module.exports = router
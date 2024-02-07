const userController = require('../controller/userControler')
const express = require('express')
const router = express.Router();

router.put('/sendMail', userController.toMail)


module.exports = router


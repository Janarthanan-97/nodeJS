const express = require('express')
const userControler = require('../controller/userControler')

const router = express.Router();

router.post('/register', userControler.register)
router.get('/verify/:resetToken', userControler.verify)
router.put('/login', userControler.login)


module.exports = router
const express = require('express')
const userControler = require('../controller/userControler')

const router = express.Router();

router.post('/register', userControler.register)
router.get('/verify/:resetToken', userControler.verify)
router.put('/login', userControler.login)
router.put('/forgetPassword', userControler.forgetPassword)
router.put('/passwordReset', userControler.passwordReset)


module.exports = router
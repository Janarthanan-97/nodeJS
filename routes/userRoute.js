const express = require('express')
const router = express.Router();
const userController = require('../controller/userControler')
const resetPassword = require('../controller/resetPassword')

router.post('/signup', userController.signup);

router.post('/accountVerify/:token', userController.accountVerify);

router.post('/signin', userController.signin);

router.post('/forgot_password', resetPassword.sendToken);

router.post('/reset_password/:token', resetPassword.verifyAndUpdatePassword);

module.exports = router;
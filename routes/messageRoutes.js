const express = require('express')
const router = express.Router()
const protect = require('../Middleware/authMiddleware') 
const { route } = require('./userRoutes')
const {allMessages, sendMessage} = require('../controller/messageControler')

router.get('/:chatId', protect, allMessages)
router.post('/', protect, sendMessage)

module.exports = router
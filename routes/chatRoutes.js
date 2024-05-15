let express = require('express')
const protect = require('../Middleware/authMiddleware')

let {accessChat, fetchChats, createGroupChat} = require('../controller/chatControler')

let router = express.Router()

router.post('/',protect, accessChat)
router.get('/', protect, fetchChats)
router.post('/group', protect, createGroupChat)


module.exports = router
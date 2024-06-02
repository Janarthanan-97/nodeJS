const express = require("express");
const protect = require('../Middleware/authMiddleware')
const { registerUser, authUser, allUsers} = require('../controller/userControler')

const router = express.Router();

router.get('/', protect, allUsers);
router.post('/',registerUser);
router.post("/login", authUser);

module.exports = router;
const express = require("express");
const protect = require('../Middleware/authMiddleware')
const { registerUser, loginUser, allUsers} = require('../controller/userControler')

const router = express.Router();

router.get('/', protect, allUsers);
router.post('/register',registerUser);
router.put("/login", loginUser);

module.exports = router;
const express = require("express");
const protect = require('../Middleware/authMiddleware')
const {getProperties, updateProperty, getMyProperty } = require('../controller/propertyControler')

const router = express.Router();

router.put('/', protect, getProperties);
router.put('/update', protect, updateProperty);
router.get('/my-property', protect, getMyProperty)

module.exports = router;
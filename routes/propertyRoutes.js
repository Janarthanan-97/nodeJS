const express = require("express");
const protect = require('../Middleware/authMiddleware')
const {getProperties, updateProperty, getMyProperty, getPropertyByID, deleteProperty } = require('../controller/propertyControler')

const router = express.Router();

router.put('/', protect, getProperties);
router.put('/update', protect, updateProperty);
router.get('/my-property', protect, getMyProperty)
router.get('/:id', protect, getPropertyByID)
router.delete('/delete/:id',protect, deleteProperty)

module.exports = router;
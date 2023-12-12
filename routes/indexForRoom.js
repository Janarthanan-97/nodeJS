let express = require('express');
let router = express.Router(); 


let roomAPIImportObject = require('../controllers/Rooms-CRUD')

router.get('/', roomAPIImportObject.getAllRoomsFromModel)

router.post('/addRoom', roomAPIImportObject.createRoom)

router.put('/bookRoom/:id', roomAPIImportObject.bookRoom)

router.delete('/deleteRoom/:id', roomAPIImportObject.deleteRoom)

module.exports = router;
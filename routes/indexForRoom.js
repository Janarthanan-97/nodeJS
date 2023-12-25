let express = require('express');
let router = express.Router(); 
let authMiddleware = require('../middleware/authmiddleware');
let roomAPIImportObject = require('../controllers/Rooms-CRUD')

router.get('/getMyRooms', authMiddleware.verifyToken, roomAPIImportObject.getMyRooms )

router.put('/', authMiddleware.verifyToken , roomAPIImportObject.getAllRoomsFromModel ) 

router.post('/addRoom', roomAPIImportObject.createRoom)

router.put('/bookRoom/:id',authMiddleware.verifyToken, roomAPIImportObject.bookRoom)

router.delete('/deleteRoom/:id', roomAPIImportObject.deleteRoom)

module.exports = router;
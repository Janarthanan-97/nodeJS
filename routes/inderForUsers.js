let express = require('express');
let router = express.Router(); 

let userAPIImportObject = require('../controllers/Users-Crud')

router.get('/', userAPIImportObject.getAllUserFromModel)

router.get('/getRoomsForUser/:id', userAPIImportObject.getRoomsForUser)

router.post('/login', userAPIImportObject.login)

router.post('/addUser', userAPIImportObject.createUser)

router.put('/updateUser/:id', userAPIImportObject.UpdateUser)

router.delete('/deleteUser/:id', userAPIImportObject.deleteUser)

module.exports = router;
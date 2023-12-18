let express = require('express');
const route = express.Router();
let teacherControl = require('../controllers/teacherControl')

route.get('/', teacherControl.getAllTeachers) ;

route.post('/', teacherControl.createTeacher);

route.put('/addStudent/:id', teacherControl.addStudentToTeacher)

route.delete('/delete/:id', teacherControl.deleteTeacher)

module.exports = route
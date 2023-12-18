let express = require('express');
const route = express.Router();
const { getAllStudents, studentsWithoutTeacher, createStudent, assignTeacher, deleteStudent } = require('../controllers/studentControl');


route.get('/', getAllStudents);

route.get('/studentsWithoutTeacher', studentsWithoutTeacher)

route.post('/', createStudent);

route.put('/assignTeacher/:id', assignTeacher)

route.delete('/delete/:id', deleteStudent)

module.exports = route
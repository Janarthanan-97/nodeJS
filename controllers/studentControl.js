let studentDB = require('../module/studentSchema')
let teacherDB = require('../module/teacherSchema')

const getAllStudents = async (req, res) => {
    try {
        let students = await studentDB.find();
        res.status(200).send(students)
    }
    catch (error) {
        res.send(error)
    }
}

const studentsWithoutTeacher = async (rrq, res) => {
    try {
        const students = await studentDB.find({"teacher":""});
        res.status(200).send(students)
    } catch (error) {
        res.send(error);
    }
}

const createStudent = async (req, res) => {
    try {
        const object = req.body;
        await studentDB.create(object)
        res.status(200).send("Student created successfully")

    } catch (error) {
        res.send(error)
    }
}

const assignTeacher = async (req, res) => {
    try {
        let { id } = req.params
        let { teacher } = req.body;


        let studentObject = await studentDB.findById(id)
        let teacherObject = await teacherDB.findById(teacher)
        
       
        console.log(studentObject.teacher)
       

        if (studentObject.teacher != teacher || studentObject.teacher == '') {
            
            //add teacher to student
            studentObject.teacher = teacher;
            await studentDB.findByIdAndUpdate(id, studentObject);

            //add student to teacher
            teacherObject.students.push(id);
            await teacherDB.findByIdAndUpdate(teacher, teacherObject);

            res.status(200).send("teacher assigned successfully")
        }
        else {
            res.send("teacher already assigned")
        }

    } catch (error) {
        res.send(error)
    }
}

const deleteStudent = async (req, res) => {
    try {
        let { id } = req.params;
        let student = await studentDB.findById(id);

        if(student.teacher != undefined && student.teacher != ""){
            //delete student from teacher 
        let teacher = await teacherDB.findById(student.teacher)
        let index = teacher.students.indexOf(id);
        teacher.students.splice(index, 1)

        await teacherDB.findByIdAndUpdate(student.teacher, teacher);
        }
        await studentDB.deleteOne({ _id: id })
        res.send("Student deleted")

    } catch (error) {
        res.send(error)
    }
}

module.exports = { getAllStudents, studentsWithoutTeacher, createStudent, assignTeacher, deleteStudent }
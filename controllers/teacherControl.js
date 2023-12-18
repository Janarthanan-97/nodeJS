const teacherDB = require('../module/teacherSchema')
const studentDB = require('../module/studentSchema')

const getAllTeachers = async (req, res) => {
    try {
        let teachers = await teacherDB.find();
        res.status(200).send(teachers)
    }
    catch (error) {
        res.send(error)
    }
}

const createTeacher = async (req, res) => {
    try {
        let object = req.body;
        await teacherDB.create(object)
        res.status(200).send("teacher created successfully")

    } catch (error) {
        res.send(error)
    }
}

const addStudentToTeacher = async (req, res) => {
    try {
        let { id } = req.params;
        let studentID = req.body.student;
        //check teacher and student available
        const teacherObject = await teacherDB.findById(id);
        const studentObject = await studentDB.findById(studentID)

        if (teacherObject && studentObject) {

            if (studentObject.teacher != id) {
                //Add student to teacher  

                teacherObject.students.push(studentID);
                await teacherDB.findByIdAndUpdate(id, teacherObject);


                //add teacher to student
                studentObject.teacher = id;
                await studentDB.findByIdAndUpdate(studentID, studentObject);
                res.status(200).send('student added successfully')
            }
            else {
                res.send("Student already in teacher list")
            }

        }
        else {
            res.send("invalid teacher or student")
        }

    } catch (error) {
        res.send(error)
    }
}

const deleteTeacher = async (req, res) => {
    try {
        let {id} = req.params;
        await studentDB.updateMany({ "teacher" : id }, { "teacher": "" } )
        await teacherDB.deleteOne({_id: id});
        res.status(200).send("teacer deleted succesfully")
    } catch (error) {
        res.send(error)
    }
}

module.exports = { getAllTeachers, createTeacher, addStudentToTeacher, deleteTeacher }
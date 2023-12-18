const { mongo } = require('mongoose')
let mongoose = require('./mongooseConnect')

teacherSchema = new mongoose.Schema(
    {
        "name": { type: String, required: [true, "name is requires"] },
        "students": []
    },
    {
        collection : "teacherDB",
        versionKey: false
    }
)

const TeacherDB = mongoose.model('teacherDB-API', teacherSchema);

module.exports = TeacherDB

let mongoose = require('./mongooseConnect')

let studentSchema = new mongoose.Schema(
    {
        "name":{ type:String, required:[true, "student name is required"] },
        "teacher": {type : String, default : "" }
    },
    {
        collection : "studentDB",
        versionKey : false
    }
)

const studentDB = mongoose.model('studentDB', studentSchema);

module.exports = studentDB
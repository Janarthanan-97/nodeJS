let mongoose = require('mongoose');
let dotenv = require('dotenv')
dotenv.config()
// console.log(process.env.ROOM_URI)

try {
    mongoose.connect(`${process.env.MONGODB_URI}/${process.env.ROOM_API}`);
} catch (error) {
    console.log(error)
}

module.exports = mongoose
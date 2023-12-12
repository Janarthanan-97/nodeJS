let mongoose = require('mongoose');
let dotenv = require('dotenv')

let {MONGODB_URI, ROOM_API} = dotenv.config().parsed;


try {
    mongoose.connect(`${MONGODB_URI}/${ROOM_API}`)
    
} catch (error) {
    console.log(error)
}
module.exports = mongoose;
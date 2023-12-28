const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config()

try {
   mongoose.connect(`${process.env.MONGODB_URI}`)
} catch (error) {
    console.log(error)
}

module.exports = mongoose;

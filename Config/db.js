const mongoose = require("mongoose");
const env = require('dotenv')

env.config()

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(env.process.MONGODB_URI);
        console.log("MongoDB Connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;
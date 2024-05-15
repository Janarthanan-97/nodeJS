const mongoose = require("mongoose");

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect('mongodb+srv://janamadhav13:Kasthuri20@cluster0.1v6kz5t.mongodb.net/chat-app');
        console.log("MongoDB Connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;
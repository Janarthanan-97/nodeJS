let mongoose = require('./databaseconnect.js');

const userSchema = new mongoose.Schema({
    "name": { type: String, required: [true, "Name is required"]},
    "userID" : { type: String, required: [true, "UserID is required"]},
    "password": { type: String, required: [true, "Password is required"]}
},
{
    collection: "UsersDB",
    versionKey: false
})

const userAPIModel = mongoose.model('UsersDB', userSchema);

module.exports = userAPIModel;
const mongoose = require('./mongooseConnect')

const userSchema = new mongoose.Schema({
    name : {type:String, required:[true, "user's name is required"]},
    email: {type:String, required:[true, 'Email-ID is required']},
    password:{type:String, required:[true, 'Password is required']},
    activated: {type:Boolean, default : false},
    resetToken:{type:String, default:""},
},{
    collection: 'users',
    versionKey:false
})

const UserDB = mongoose.model('users', userSchema)

module.exports = UserDB
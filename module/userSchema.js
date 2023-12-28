const mongoose = require('./mongooseConnect')


const userSchema = new mongoose.Schema({
    emailID: { type: String, required : [true, 'Email-ID is required'] },
    password:{ type:String, required : [true, 'Password is required'] },
    token:{type:String, default:''}
},{
    collection: "mailDB",
    versionKey : false
})

const userDB = mongoose.model('mailDB', userSchema);

module.exports = userDB;


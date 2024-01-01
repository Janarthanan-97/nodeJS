const mongoose = require('./mongooseConnect')


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        activated: {
            type: Boolean,
            default: false
        },
        resetToken: String,
        resetExpiry: Date,
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        url: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'URL-shortDB'
        }],
    }, {
    collection: "URL-userDB",
    versionKey: false
})

const userDB = mongoose.model('URL-userDB', userSchema);

module.exports = userDB;


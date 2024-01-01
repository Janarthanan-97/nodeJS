const mongoose = require('./mongooseConnect')


const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        shortURL: {
            type: String,
            required: true,
        },
        longURL: {
            type: String,
            required: true,
        },
        createdAt: {
            type: String,
            required: true,
        },
        month: {
            type: String,
            required: true,
        },
        clicks: {
            type: Number,
            required: true,
            default: 0,
        },
        user: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'URL-userDB'
        }],
    }, {
    collection: "URL-shortDB",
    versionKey: false
})

const URLDB = mongoose.model('URL-shortDB', urlSchema);

module.exports = URLDB;


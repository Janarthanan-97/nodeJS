const mongoose = require('mongoose')

let messageSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chats" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
},
{
    timeStamp : true
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
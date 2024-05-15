const mongoose = require('mongoose')

const chatModel = mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message'
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
},
    {
        timestamps: true,
        versionKey: false

    });

    const Chat = mongoose.model('chats', chatModel)

    module.exports = Chat
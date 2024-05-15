const Message = require('../module/MessageModel')

const allMessages = async(req, res)=>{
    try {
        const messages = await Message.find({ chat: req.params.chatId })
                            .populate('sender', 'name pic email')
                            .populate('chat')
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }

}

const sendMessage = ()=>{

}

module.exports = {allMessages, sendMessage}
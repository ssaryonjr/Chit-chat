const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");



//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
const sendMessage = asyncHandler(async (req, res) => {
    const { messageSent, chatId } = req.body
    
    if (!messageSent || !chatId) {
        console.log("Unable to send your message")
        return res.sendStatus(400)
    }

    var newMessage = {
        sender: req.user._id,
        messageSent: messageSent,
        chatReference: chatId,
    }

    try {
        var message = await Message.create(newMessage)

        message = await message.populate("sender", "firstName lastName profilePic")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: 'chat.users',
            select: "firstName lastName profilePic",
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        })

        res.json(message)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

module.exports = { sendMessage }
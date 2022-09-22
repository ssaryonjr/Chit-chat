const mongoose = require('mongoose');

const messageModel = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messageSent: {
    type: String,
    trim: true,
  },
  chatReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    },
}, {timestamps: true})

const Message = mongoose.model("Message", messageModel);

module.exports = Message;

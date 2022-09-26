const asyncHandler = require('express-async-handler')
const Chat = require('../models/chatModel')
const User = require('../models/userModel')

//@desc Create or Access existing chat with 1-1 user.
//@route POST /api/chat
//@access Private
const chatAccess = asyncHandler(async (req, res) => {
    //Current logged in user
    const { userId } = req.body

    if (!userId) {
        console.log("UserId was not sent with request")
        return res.sendStatus(400)
    }

    //Locate chat between two users if it exist.
    var conversation = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } }
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage")
    
    //Show the latest message in chat
    conversation = await User.populate(conversation, {
        path: "latestMessage.sender",
        select: "firstName lastName profilePic"
    })

    //Checking if chat between two users already exist otherwise create it.
    if (conversation.length > 0) {
        res.send(conversation[0])
        return //Might remove later, testing
    } else {
        var conversationData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }

        try {
            const createdChat = await Chat.create(conversationData)
            const displayChat = await Chat.findOne({ _id: createdChat._id })
                .populate("users", "-password")
            res.status(400).send(displayChat)
        } catch (error) {
            throw new Error(error.message)
        }
    }
})

//@desc Display all chat's of signed in user.
//@route GET /api/chat
//@access Private
const fetchAllChat = asyncHandler(async (req, res) => {
    try { 
        //Find all chat that matches the current user.
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupHost", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (data) => {
                data = await User.populate(data, {
                    path: "latestMessage.sender",
                    select: "firstName lastName profilePic email"
                })

                res.status(200).send(data)
            })
    } catch (error) {
        res.status(400);
        throw new Error(error.message)
    }
})

//@desc Create chat with 3 or more user.
//@route POST /api/chat/groupChat
//@access Private
const createGroupChat = asyncHandler(async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please complete all fields"})
    }

    var allUsers = JSON.parse(req.body.users)

    if (allUsers.length < 2) {
        return res.status(400).send("A minimum of two users must be selected to create a group chat")
    }

    allUsers.push(req.user)

    try {
        const createdGroupChat = await Chat.create({
            chatName: req.body.name,
            users: allUsers,
            isGroupChat: true,
            groupHost: req.user
        })

        const allGroupMembers = await Chat.findOne({ _id: createdGroupChat._id })
            .populate("users", "-password")
            .populate("groupHost", "-password")
        
        res.status(200).json(allGroupMembers)
    } catch (error) {
        
    }
})

//@desc Update name of groupchat
//@route PUT /api/chat/renameGc
//@access Private
const renameGroupChat = asyncHandler(async (req, res) => {
    const { chatId, chatName } = req.body

    const updatedName = await Chat.findByIdAndUpdate(chatId,
        { chatName }, { new: true })
        .populate("users", "-password").populate("groupHost", "-password")
    
    if (!updatedName) {
        res.status(404)
        throw new Error("Group Chat not found")
    } else {
        res.json(updatedName).send(`Group Chat name updated to: ${chatName}`)
    }
})

//@desc Add user to a group chat
//@route PUT /api/chat/addGcUser
//@access Private
const addGcUser = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body

    const addedUser = await Chat.findByIdAndUpdate(chatId, {
        $push: { users: userId },
    }, { new: true })
        .populate("users", "-password")
        .populate("groupHost", "-password")
    
    if (!addedUser) {
        res.status(400)
        throw new Error("User not found")
    } else {
        res.json(addedUser)
    }
})

//@desc Remove user to a group chat
//@route PUT /api/chat/removeGcUser
//@access Private
const removeGcUser = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removeUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupHost", "-password");

  if (!removeUser) {
    res.status(400);
    throw new Error("User not found");
  } else {
    res.json(removeUser);
  }
});

//@desc Retrieve a singular specific chat to display.
//@route GET /api/chat/:id
//@access Private

const openSingleChat = asyncHandler(async (req, res) => {
    try {
        const data = await Chat.findById(req.params.id).populate(
          "users",
          "-password"
        );
        res.status(200).send(data);
    } catch (error) {
        console.log(error)
    }
})

module.exports = {
  chatAccess,
  fetchAllChat,
  createGroupChat,
  renameGroupChat,
  addGcUser,
  removeGcUser,
  openSingleChat
};
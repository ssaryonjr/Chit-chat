const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../middleware/generateToken')


//@desc Register the user.
//@route POST /api/user
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, profilePic } = req.body;

    //Validates that all required fields have been inputed.
    if (!firstName || !lastName || !email || !password) {
        res.status(400);
        throw new Error("Please enter all require fields.")
    }

    //Validates if email address has already been registered in mongodb. 
    const userExist = await User.findOne({ email }) 
    if (userExist) {
        res.status(400);
        throw new Error("This user already exist.")
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        profilePic
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePic: user.profilePic,
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Account could not be created.")
    }
})


//@desc Authenticate a user.
//@route POST /api/user/login
//@access Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    //Locate email in database
    const user = await User.findOne({ email });

    //Sends signed-in user data back to client side.
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profilePic: user.profilePic,
            token: generateToken(user._id),
        })
    } else {
        res.status(401);
        throw new Error("Invalid credentials")
    }
})

//@desc Fetch all users (for searching)
//@route GET /api/user
//@access Private
//Example: /api/user?search=sam
const findUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search ? {
        $or: [
            { firstName: { $regex: req.query.search, $options: "i" } },
            { lastName: { $regex: req.query.search, $options: "i" } },
            ],
        } : {};

    const users = await User.find(keyword).find({
    _id: { $ne: req.user._id },
    });
    res.send(users);
})

const updateOnlineStatus = asyncHandler(async (req, res) => {
  //Current logged in user
  const { userId, status } = req.body;

  if (!userId) {
    console.log("UserId or online status was not sent with request");
    return res.sendStatus(400);
  }

  try {
    const updateOnlineStatus = await User.findByIdAndUpdate(userId, {
      userStatus: status,
      lastActive: new Date()
    });
    
    res.status(200).json(updateOnlineStatus)
      
  } catch (error) {
      console.log(error)
      throw new Error('Unable to update users online status =(')
  }
});


module.exports = {
    registerUser,
    loginUser,
    findUsers,
    updateOnlineStatus
}
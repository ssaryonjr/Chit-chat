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

module.exports = {registerUser, loginUser}
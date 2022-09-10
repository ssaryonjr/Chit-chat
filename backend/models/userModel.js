const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email.",
      ],
    },
    password: {
      type: String,
      require: true,
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dng5tdawb/image/upload/v1662105307/blank-profile-picture-973460_1280_owecxz.png",
    },
  },
  { timestamps: true }
);

//Verifies if encrypt password matches the hashed password.
userSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password)
}

//Before saving created user to database hash password.
userSchema.pre('save', async function (next) {

  //If password already modified, move on.
  if (!this.isModified) {
    next()
  }

  //Encrypts password
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model("User", userSchema)
module.exports = User
const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lasttName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    }, 
    profilePic: {
      type: String,
      require: true,
      default:
        "https://res.cloudinary.com/dng5tdawb/image/upload/v1662105307/blank-profile-picture-973460_1280_owecxz.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema)

module.exports = User
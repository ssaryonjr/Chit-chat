import React, { useState } from 'react'
import Logo from '../img/logo.png'
import { Link } from 'react-router-dom'

function SignUpPage() {

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
    profilePic: "https://res.cloudinary.com/dng5tdawb/image/upload/v1662530729/ece2b0f541d47e4078aef33ffd22777e_tqiffc.jpg"
  });

  const [warning, setWarning] = useState('')

  const updateForm = (event) => {
    const { name, value } = event.target
    setSignupForm(prevData => ({
      ...prevData,
      [name]: value
    }))
  }
  
  //Update user profile picture on screen. 
  const uploadPicture = (event) => {
    const retrievedPicture = event.target.files[0];

    if (retrievedPicture === undefined) {
      setWarning('Please select an image!')
      return
    }

    // if (retrievedPicture )

    const pic = URL.createObjectURL(event.target.files[0])
    setSignupForm(prevData => ({
      ...prevData,
      profilePic: pic
    }))
  }

  const handleSubmit = () => {

  }

  return (
    <>
      <main className="auth-container">
        <div className="signup-top-container">
          <h1 className="text text-large">Sign-up</h1>
          <img className="logo-signup" src={Logo} alt="logo" />
        </div>

        <div className="register-profile-form">
          <img
            src={signupForm.profilePic}
            className="register-pic"
            alt="user profile"
          />
          <span className="online-indicator"></span>
        </div>

        <form className="login-form">
          <label htmlFor="profilePic">
            <span className="register-label">Upload Profile Picture:</span>
            <input
              type="file"
              placeholder="Email Address"
              className="auth input-field"
              onChange={uploadPicture}
            />
          </label>
          <div className="register-name-container">
            <div className="register-name-wrapper">
              <label htmlFor="firstName">
                <span className="register-label">
                  First Name: <span className="require-star">*</span>
                </span>
                <input
                  type="text"
                  placeholder="First Name"
                  className="auth name-field input-field"
                  required="true"
                  onChange={updateForm}
                  name="firstName"
                  value={signupForm.firstName}
                />
              </label>
            </div>

            <div className="register-name-wrapper">
              <label htmlFor="lastName">
                <span className="register-label">
                  Last Name: <span className="require-star">*</span>
                </span>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="auth name-field input-field"
                  required="true"
                  onChange={updateForm}
                  name="lastName"
                  value={signupForm.lastName}
                />
              </label>
            </div>
          </div>
          <label htmlFor="email">
            <span className="register-label">
              Email: <span className="require-star">*</span>
            </span>
            <input
              type="email"
              placeholder="Email Address"
              className="auth input-field"
              required="true"
              onChange={updateForm}
              name="email"
              value={signupForm.email}
            />
          </label>
          <label htmlFor="password">
            <span className="register-label">
              Password: <span className="require-star">*</span>
            </span>
            <input
              type="password"
              placeholder="Password"
              className="auth input-field"
              required="true"
              onChange={updateForm}
              name="password"
              value={signupForm.password}
            />
          </label>
          <label htmlFor="confPassword">
            <span className="register-label">
              Confirm Password: <span className="require-star">*</span>
            </span>
            <input
              type="password"
              placeholder="Confirm Password"
              className="auth input-field"
              required="true"
              onChange={updateForm}
              name="confPassword"
              value={signupForm.confPassword}
            />
          </label>
          <span className="form-warning">{warning}</span>
          <div className="auth-control">
            <button className="auth-submit">Sign In</button>
          </div>
        </form>
        <div className="striped">
          <span className="striped-line"></span>
          <span className="striped-text">OR</span>
          <span className="striped-line"></span>
        </div>
        <p className="text text-normal">
          Already have an account?
          <Link to="/">
            <span className="text-links"> Login</span>
          </Link>
        </p>
      </main>
    </>
  );
}

export default SignUpPage
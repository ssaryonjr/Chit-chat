import React from 'react'
import Logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import sam from '../img/samprofile.png'

function SignUpPage() {
  return (
    <>
      <main className="auth-register-container">
        <div>
          <div className="signup-top-container">
            <h1 className="text text-medium">Create an account</h1>
            <img class="logo-signup" src={Logo} alt="logo" />
          </div>

          <div className="register-profile-form">
            <img
              src="https://res.cloudinary.com/dng5tdawb/image/upload/v1662105307/blank-profile-picture-973460_1280_owecxz.png"
              className="register-pic"
            />
            <span className="online-indicator"></span>
            <input type="file" />
          </div>

          <form className="login-form">
            <label htmlFor="firstName">
              <input
                type="text"
                placeholder="First Name"
                className="auth name-field input-field"
                required="true"
              />
            </label>
            <label htmlFor="firstName">
              <input
                type="text"
                placeholder="Last Name"
                className="auth name-field input-field"
                required="true"
              />
            </label>
            <label htmlFor="email">
              <span className="register-label">Email:</span>
              <input
                type="email"
                placeholder="Email Address"
                className="auth input-field"
                required="true"
              />
            </label>
            <label htmlFor="password">
              <span className="register-label">Password:</span>
              <input
                type="password"
                placeholder="Password"
                className="auth input-field"
                required="true"
              />
            </label>
            <label htmlFor="Confpassword">
              <span className="register-label">Confirm Password: </span>
              <input
                type="password"
                placeholder="Confirm Password"
                className="auth input-field"
                required="true"
              />
            </label>

            <div className="auth-control">
              <button className="auth-submit">Sign In</button>
            </div>
          </form>
          <div class="striped">
            <span class="striped-line"></span>
            <span class="striped-text">OR</span>
            <span class="striped-line"></span>
          </div>
          <p className="text text-normal">
            Already have an account?
            <Link to="/">
              <span className="text-links"> Login</span>
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default SignUpPage
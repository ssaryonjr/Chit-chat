import React from 'react'
import Logo from '../img/logo.png'
import { Link } from 'react-router-dom'

function SignUpPage() {
  return (
    <>
      <main className="auth-container">
        <div>
          <div className="signup-top-container">
            <h1 className="text text-medium">Create account</h1>
            <img className="logo-signup" src={Logo} alt="logo" />
          </div>

          <div className="register-profile-form">
            <img
              src="https://i.pinimg.com/474x/ec/e2/b0/ece2b0f541d47e4078aef33ffd22777e.jpg"
              className="register-pic"
              alt="user icon"
            />
            <span className="online-indicator"></span>
          </div>

          <form className="login-form">
            <label htmlFor="email">
              <span className="register-label">
                Upload a Profile Picture:
              </span>
              <input
                type="file"
                placeholder="Email Address"
                className="auth input-field"
                required="true"
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
              />
            </label>
            <label htmlFor="Confpassword">
              <span className="register-label">
                Confirm Password: <span className="require-star">*</span>
              </span>
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
        </div>
      </main>
    </>
  );
}

export default SignUpPage
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Logo from '../img/logo.png' 

const Home = () => {
  return (
    <>
      <main className="auth-container">
        <div>
          <div className="login-top-container">
            <h1 className="text text-large">Sign In</h1>
            <img class="logo" src={Logo} alt="logo" />
          </div>
          <p className="text text-normal">
            New here?{" "}
            <Link to="/signup">
              <span className="text-links">Create an account!</span>
            </Link>
          </p>

          <form className="login-form">
            <label htmlFor="email">
              <input
                type="email"
                placeholder="Email Address"
                className="auth input-field"
                required="true"
              />
            </label>
            <label htmlFor="password">
              <input
                type="password"
                placeholder="Password"
                className="auth input-field"
                required="true"
              />
            </label>

            <div className="auth-control">
              <a href="./signup" className="text-links">
                Forgot password
              </a>
              <button className="auth-submit">Sign In</button>
            </div>
          </form>
          <div class="striped">
            <span class="striped-line"></span>
            <span class="striped-text">OR</span>
            <span class="striped-line"></span>
          </div>
        </div>

        <div className="login-options">
          <button className="login-method">
            <img
              className="affiliate-icons"
              src="https://res.cloudinary.com/dng5tdawb/image/upload/v1662515134/google-logo-png-suite-everything-you-need-know-about-google-newest-0_uu57nf.png"
              alt="google icon"
            />
            Sign in with Google
          </button>
          <button className="login-method">
            <img
              className="affiliate-icons"
              src="https://res.cloudinary.com/dng5tdawb/image/upload/v1662515176/facebook-logo-png-transparent-background_s06sid.png"
              alt="google icon"
            />
            Sign in with Facebook
          </button>
        </div>
      </main>
    </>
  );
}

export default Home
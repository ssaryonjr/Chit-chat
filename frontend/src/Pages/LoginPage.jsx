import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Logo from '../img/logo.png' 
import axios from "axios";


const Home = () => {
  const navigate = useNavigate();

  //Checks if user is already logged in.
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'))
    if (user) navigate("/homepage")
  }, [])
  

  const [warning, setWarning] = useState('')
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  const updateForm = (event) => {
    const { name, value} = event.target
    setLoginForm(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    const {email, password} = loginForm
    if (!email || !password) {
      setWarning("Please fill out all fields")
      return
    }

    try {
      const { data } = await axios.post("/api/user/login",
        { email, password },
        { headers: { "Content-type": "application/json" } }
      );

        localStorage.setItem("userData", JSON.stringify(data));
        navigate("/homepage");


    } catch (error) {
      setWarning("Invalid user credentials")
    }
  }

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
                onChange={updateForm}
                name="email"
                value={loginForm.email}
              />
            </label>
            <label htmlFor="password">
              <input
                type="password"
                placeholder="Password"
                className="auth input-field"
                onChange={updateForm}
                name="password"
                value={loginForm.password}
              />
            </label>
            <span className="form-warning">{warning}</span>
            <div className="auth-control">
              <a href="./forgotpassword" className="text-links">
                Forgot password
              </a>
              <button className="auth-submit"
              onClick={handleSubmit}
              >Sign In</button>
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
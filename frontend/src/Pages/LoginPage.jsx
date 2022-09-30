import React, {useState, useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Logo from '../img/logo.png' 
import facebookLogo from '../img/facebook-logo.png'
import googleLogo from '../img/google-logo.png'
import axios from "axios";
import ToastNotification from '../components/ToastNotification'
import ChatContext from "../ChatContext";


const Home = () => {
  //Global States
  const {
    width,
    setWidth,
    setShowChatBox,
    setShowMessageList,
  } = useContext(ChatContext);
  useEffect(() => {
    const handleResizeWindow = () => {
      setWidth(window.innerWidth);
    };

    if (width < 930) {
      setShowChatBox(false);
      setShowMessageList(true);
    }

    if (width > 930) {
      setShowChatBox(true);
      setShowMessageList(true);
    }

    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  const navigate = useNavigate();

  //Checks if user is already logged in.
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user) navigate("/homepage");
  }, []);

  //Local states
  const [showToast, setShowToast] = useState(false);
  const [warning, setWarning] = useState("");
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const updateForm = (event) => {
    const { name, value } = event.target;
    setLoginForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = loginForm;
    if (!email || !password) {
      setWarning("Please fill out all fields");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        { headers: { "Content-type": "application/json" } }
      );

      localStorage.setItem("userData", JSON.stringify(data));
      navigate("/homepage");
    } catch (error) {
      setWarning("Invalid user credentials");
    }
  };

  return (
    <>
      <ToastNotification
        showToast={showToast}
        handleClose={() => setShowToast(false)}
      />

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
              <button className="auth-submit" onClick={handleSubmit}>
                Sign In
              </button>
            </div>
          </form>
          <div class="striped">
            <span class="striped-line"></span>
            <span class="striped-text">OR</span>
            <span class="striped-line"></span>
          </div>
        </div>

        <div className="login-options">
          <button className="login-method" onClick={() => setShowToast(true)}>
            <img
              className="affiliate-icons"
              src={googleLogo}
              alt="google icon"
            />
            Sign in with Google
          </button>
          <button className="login-method" onClick={() => setShowToast(true)}>
            <img
              className="affiliate-icons"
              src={facebookLogo}
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
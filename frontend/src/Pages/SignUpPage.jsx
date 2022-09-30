import React, { useState, useContext, useEffect } from 'react'
import Logo from '../img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChatContext from '../ChatContext'


function SignUpPage() {
  //Global States
  const { width, setWidth, setShowChatBox, setShowMessageList } =
    useContext(ChatContext);
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
  const defaultProfile =
    "https://res.cloudinary.com/ssaryonjr/image/upload/v1662530729/ece2b0f541d47e4078aef33ffd22777e_tqiffc.jpg";

  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
    profilePic: defaultProfile,
  });

  const updateForm = (event) => {
    const { name, value } = event.target;
    setSignupForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Update user profile picture on screen.
  const uploadPicture = (retrievedPicture) => {
    if (retrievedPicture === undefined) {
      setSignupForm((prevData) => ({
        ...prevData,
        profilePic: defaultProfile,
      }));
      setWarning("");
    }

    if (
      retrievedPicture.type === "image/jpeg" ||
      retrievedPicture.type === "image/png"
    ) {
      setLoading(true);
      const data = new FormData();
      data.append("file", retrievedPicture);
      data.append("upload_preset", "Chitchat");
      data.append("cloud_name", "ssaryonjr");

      fetch("https://api.cloudinary.com/v1_1/ssaryonjr/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setSignupForm((prevData) => ({
            ...prevData,
            profilePic: data.url.toString(),
          }));
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });

      setWarning("");
    } else {
      setWarning("Uploaded picture is not supported");
      setSignupForm((prevData) => ({
        ...prevData,
        profilePic: defaultProfile,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password, confPassword, profilePic } =
      signupForm;

    //Validates all fields have be inputed.
    if (!firstName || !lastName || !email || !password || !confPassword) {
      setWarning("Please fill out all required fields");
      return;
    }

    if (password !== confPassword) {
      setWarning("Passwords do not match");
      return;
    }

    if (password.length <= 5) {
      setWarning("Password must be a minimum of 6 characters");
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/user",
        { firstName, lastName, email, password, profilePic },
        { headers: { "Content-type": "application/json" } }
      );

      localStorage.setItem("userData", JSON.stringify(data));
      navigate("/homepage");

      //User info
      const currentUser = JSON.parse(localStorage.getItem("userData"));
      axios.defaults.headers.common.Authorization = `Bearer ${currentUser.token}`;

      //Automatic generated welcome message.
      await axios.post(`/api/chat`, {
        userId: "6335195dd79952cd9e023a94",
      });
    } catch (error) {
      setWarning(
        error.response.data.message
          .toString()
          .split("User validation failed:  ")
      );
      console.log(error);
    }
  };

  const profileImg = (
    <>
      <img
        src={signupForm.profilePic}
        className="register-pic"
        alt="user profile"
      />
      <span className="online-indicator"></span>
    </>
  );

  const loadSpinner = <span className="loading__anim"></span>;

  return (
    <>
      <main className="auth-container">
        <div className="signup-top-container">
          <h1 className="text text-large">Sign-up</h1>
          <img className="logo-signup" src={Logo} alt="logo" />
        </div>

        <div className="register-profile-form">
          {loading ? loadSpinner : profileImg}
        </div>

        <form className="login-form">
          <label htmlFor="profilePic">
            <span className="register-label">Upload Profile Picture:</span>
            <input
              type="file"
              placeholder="Email Address"
              className="auth input-field"
              onChange={(e) => uploadPicture(e.target.files[0])}
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
            <button className="auth-submit" onClick={handleSubmit}>
              Sign up
            </button>
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
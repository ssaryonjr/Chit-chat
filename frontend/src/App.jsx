import "./main.css";
import { Routes, Route } from "react-router-dom"
import React, { useState } from 'react'
import LoginPage from './Pages/LoginPage'
import MainPage from './Pages/MainPage'
import ThemeToggle from "./components/ThemeToggle"
import SignUpPage from "./Pages/SignUpPage";

import ChatProvider from "./Context/ChatProvider";

function App() {
  const [toggleTheme, setToggleTheme] = useState("light");

  const switchTheme = () => {
    const newTheme = toggleTheme === "light" ? "dark" : "light";
    setToggleTheme(newTheme);
  };


  return (
    <ChatProvider>
    <div className="app" data-theme={toggleTheme}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <ThemeToggle handleClick={switchTheme} />
      </div>
      </ChatProvider>
  );
}

export default App;

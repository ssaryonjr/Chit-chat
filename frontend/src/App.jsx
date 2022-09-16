import "./main.css";
import { Routes, Route } from "react-router-dom"
import React, { useState } from 'react'
import LoginPage from './Pages/LoginPage'
import MainPage from './Pages/MainPage'
import ThemeToggle from "./components/ThemeToggle"
import SignUpPage from "./Pages/SignUpPage";

import { ChatProvider } from './ChatContext'

function App() {
  const [toggleTheme, setToggleTheme] = useState("light");

  const switchTheme = () => {
    const newTheme = toggleTheme === "light" ? "dark" : "light";
    setToggleTheme(newTheme);
  };


  return (
    <div className="app" data-theme={toggleTheme}>
      <ChatProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
        <ThemeToggle handleClick={switchTheme} />
      </ChatProvider>  
    </div>
      
  );
}

export default App;

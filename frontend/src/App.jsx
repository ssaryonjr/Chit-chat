import "./main.css";
import { Routes, Route } from "react-router-dom"
import React, { useState } from 'react'
import LoginPage from './Pages/LoginPage'
import MainPage from './Pages/MainPage'
import ThemeToggle from "./components/ThemeToggle"
import SignUpPage from "./Pages/SignUpPage";

export const ActiveMessageContext = React.createContext()

function App() {
  const [toggleTheme, setToggleTheme] = useState("light");

  const switchTheme = () => {
    const newTheme = toggleTheme === "light" ? "dark" : "light";
    setToggleTheme(newTheme);
  };


  return (
    <ActiveMessageContext.Provider>
    <div className="app" data-theme={toggleTheme}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <ThemeToggle handleClick={switchTheme} />
      </div>
      </ActiveMessageContext.Provider>
  );
}

export default App;

import "./main.css";
import { Routes, Route } from "react-router-dom"
import React, { useState } from 'react'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import ThemeToggle from "./components/ThemeToggle"
import SignUpPage from "./Pages/SignUpPage";

export const ThemeContext = React.createContext()

function App() {
  const [toggleTheme, setToggleTheme] = useState("light");

  const switchTheme = () => {
    const newTheme = toggleTheme === "light" ? "dark" : "light";
    setToggleTheme(newTheme);
  };


  return (
    <div className="app" data-theme={toggleTheme}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <ThemeToggle handleClick={switchTheme} />
    </div>
  );
}

export default App;

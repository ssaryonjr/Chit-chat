import "./main.css";
import { Routes, Route } from "react-router-dom"
import React, { useState, useContext} from 'react'
import LoginPage from './Pages/LoginPage'
import ChatPage from "./Pages/ChatPage";
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
        <Route path="/messages" element={<ChatPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <ThemeToggle handleClick={switchTheme} />
    </div>
  );
}

export default App;

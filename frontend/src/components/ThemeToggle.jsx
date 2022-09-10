import React from 'react'

function ThemeToggle(prop) {
  return (
    <div className="toggle-switch">
      <label className="toggle-container">
        <input
          className="toggle-checker"
          type="checkbox"
          onClick={prop.handleClick}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default ThemeToggle
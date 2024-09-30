"use client"
import React from "react";
import { useDarkMode } from "./useDarkmode";


const DarkModeSwitch: React.FC = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__input"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <span className="toggle-switch__slider"></span>
    </label>
  );
};

export default DarkModeSwitch;
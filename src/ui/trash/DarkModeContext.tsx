"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  isInitialized: boolean;
}

interface DarkModeProviderProps {
  children: ReactNode;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({
  children,
}) => {
  // Add isInitialized state to track when the initial dark mode is properly determined
  const [isInitialized, setIsInitialized] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Handle initial state setup
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine initial dark mode state
    const initialDarkMode = savedMode !== null 
      ? savedMode === 'true'
      : systemPrefersDark;

    setDarkMode(initialDarkMode);
    
    // Apply initial class
    if (initialDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Mark as initialized
    setIsInitialized(true);

    // Remove initial invisible class
    document.body.classList.remove('invisible');
  }, []);

  // Handle system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const newMode = e.matches;
      setDarkMode(newMode);
      localStorage.setItem('darkMode', newMode.toString());
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle dark mode changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('darkMode', darkMode.toString());
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [darkMode, isInitialized]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, isInitialized }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = React.useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};
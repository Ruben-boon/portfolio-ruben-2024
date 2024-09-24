"use client";
import React, { createContext, ReactNode } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
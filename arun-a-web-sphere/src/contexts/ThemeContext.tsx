import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the type for the context value
interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

// Create the context with a default value (this is optional, but helps with TypeScript)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the ThemeProvider component
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize darkMode state - default to light mode (false)
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Always ensure light mode
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

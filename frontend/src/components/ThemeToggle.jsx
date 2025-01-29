import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement; // <html> element
    if (isDarkMode) {
      root.classList.add('dark'); // Add the 'dark' class
      localStorage.setItem('theme', 'dark'); // Save preference
    } else {
      root.classList.remove('dark'); // Remove the 'dark' class
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme'); // Get saved theme
    if (savedTheme === 'dark') {
      setIsDarkMode(true); // Set initial state to dark mode
    }
  }, []);

  return (
    <div className="flex items-center justify-center py-4">
      <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            id="theme-toggle"
            type="checkbox"
            className="sr-only"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <div className="block w-14 h-8 bg-gray-300  rounded-full"></div>
          <div
            className={`absolute left-1 top-1 w-6 h-6 rounded-full transition ${
              isDarkMode ? 'translate-x-6 bg-black' : 'bg-white'
            }`}
          ></div>
        </div>
        <span className="ml-3 text-gray-700 ">
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
      </label>
    </div>
  );
}

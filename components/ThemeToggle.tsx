"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark =
      localStorage.getItem("darkMode") === "true" ||
      document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    console.log("Theme toggle clicked, current:", darkMode);
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));

    if (newMode) {
      document.documentElement.classList.add("dark");
      console.log("Switched to DARK mode");
    } else {
      document.documentElement.classList.remove("dark");
      console.log("Switched to LIGHT mode");
    }
  };

  // Don't render until mounted on client
  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 w-12 h-12 bg-gray-200 rounded-full z-50" />
    );
  }

  return (
    <motion.button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 p-3 rounded-full bg-gray-200 dark:bg-gray-800 shadow-lg z-50 hover:scale-110 transition-transform"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={darkMode}
      type="button"
    >
      <span className="text-2xl" role="img" aria-hidden="true">
        {darkMode ? "🌙" : "☀️"}
      </span>
    </motion.button>
  );
}

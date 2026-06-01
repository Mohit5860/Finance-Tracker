"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function LayoutWrapper({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved preference or system preference
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      setIsDarkMode(JSON.parse(saved));
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode, mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Navbar onThemeToggle={() => setIsDarkMode(!isDarkMode)} isDarkMode={isDarkMode} />
      {children}
    </div>
  );
}

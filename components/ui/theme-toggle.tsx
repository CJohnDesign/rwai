"use client";

import { useTheme } from "../theme-provider";
import { Button } from "./button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  variant?: "icon" | "button";
  className?: string;
}

export function ThemeToggle({ 
  variant = "icon",
  className = ""
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only show the toggle after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Return empty placeholder with same dimensions to prevent layout shift
  if (!mounted) {
    return variant === "icon" 
      ? <div className={`w-9 h-9 ${className}`} />
      : <div className={`h-9 ${className}`} />;
  }

  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className={className}
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className={`flex items-center gap-2 ${className}`}
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-4 w-4" />
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          <span>Dark Mode</span>
        </>
      )}
    </Button>
  );
} 
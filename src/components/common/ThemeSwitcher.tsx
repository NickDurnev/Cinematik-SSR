"use client";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import useSizeScreen from "@/hooks/useSizeScreen";
import { ScreenType } from "@/types/general";

import { Button } from "../common";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const screenSize = useSizeScreen();
  const isPhone = screenSize === ScreenType.PHONE;

  const changeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  // Prevents hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <Button
      isIconButton={true}
      aria-label="theme-switcher"
      onClick={changeTheme}
    >
      {theme === "dark" ? (
        <DarkModeIcon fontSize={isPhone ? "medium" : "large"} />
      ) : (
        <LightModeIcon fontSize={isPhone ? "medium" : "large"} />
      )}
    </Button>
  );
};

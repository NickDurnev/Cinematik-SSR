"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";

import { Button } from "@/components";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

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
      {theme === "dark" ? <BsMoonStars size={25} /> : <BsSun size={25} />}
    </Button>
  );
};

export default ThemeSwitcher;

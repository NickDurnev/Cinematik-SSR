"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface SpinnerProps {
  size?: number;
}

export const Spinner = ({ size = 20 }: SpinnerProps) => {
  const { theme } = useTheme();
  const [colors, setColors] = useState<string[]>(["#a1b2d4", "#141414"]);

  useEffect(() => {
    const accent_color = theme === "dark" ? "#4b43a5" : "#a1b2d4";
    const text_color = theme === "dark" ? "#ffffffd3" : "#141414";

    setColors([accent_color, text_color]);
  }, [theme]);

  return (
    <>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={colors[1]} />
            <stop offset="100%" stopColor={colors[0]} />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        size={size}
        sx={{
          "svg circle": { stroke: "url(#my_gradient)" },
        }}
      />
    </>
  );
};

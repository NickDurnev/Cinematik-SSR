"use client";

import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import React from "react";
import { ToastContainer } from "react-toastify";

import theme from "@/utils/theme";

import EmotionCacheProvider from "./EmotionCacheProvider";

type Props = {
  children: React.ReactNode;
};

function ToastProvider() {
  const { resolvedTheme } = useTheme();
  const toastTheme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <ToastContainer
      autoClose={3000}
      position="top-center"
      limit={3}
      theme={toastTheme}
    />
  );
}

export const StyleProviders = ({ children }: Props) => {
  return (
    <EmotionCacheProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ThemeProvider theme={theme}>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </NextThemesProvider>
    </EmotionCacheProvider>
  );
};

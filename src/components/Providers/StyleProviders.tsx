"use client";

import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

import theme from "@/utils/theme";

import ToastProvider from "./ToastProvider";

type Props = {
  children: React.ReactNode;
};

export default function StyleProviders({ children }: Props) {
  return (
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
  );
}

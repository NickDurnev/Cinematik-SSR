"use client";

import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

import { ToastProvider } from "@/components";
import theme from "@/utils/theme";

type Props = {
  children: React.ReactNode;
};

export const StyleProviders = ({ children }: Props) => {
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
};

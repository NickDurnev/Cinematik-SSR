"use client";

import { ThemeProvider } from "@mui/material/styles";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";
import { ToastContainer } from "react-toastify";

import theme from "@/utils/theme";

type Props = {
  children: React.ReactNode;
};

const ToastProvider = () => {
  return <ToastContainer autoClose={3000} position="top-center" limit={1} />;
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

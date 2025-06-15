"use client";
import React from "react";

import theme from "@/services/theme";
import { ThemeProvider } from "@mui/material/styles";
import ToastProvider from "./ToastProvider";

type Props = {
  children: React.ReactNode;
};

export default function StyleProviders({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <ToastProvider />
    </ThemeProvider>
  );
}

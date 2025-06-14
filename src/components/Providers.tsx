"use client";

import theme from "@/services/theme";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ToastProvider from "./ToastProvider";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      {children}
      <ToastProvider />
    </ThemeProvider>
  );
}

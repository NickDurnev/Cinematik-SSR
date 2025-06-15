import type { Metadata } from "next";
import React from "react";

import { AuthProvider, StyleProviders } from "@/components";
import QueryProvider from "@/libs/query-provider";

import "react-toastify/dist/ReactToastify.css";
import "@/globals.css";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "CINEMATIK",
  description: "App for searching movies",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/Logo.svg",
  },
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <QueryProvider>
            <StyleProviders>{children}</StyleProviders>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

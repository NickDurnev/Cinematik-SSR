import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

import QueryProvider from "@/libs/query-provider";
import { AuthProvider, StyleProviders } from "@/providers";

import { ReactScan } from "./react-scan";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "CINEMATIK",
  description: "App for searching movies",
  icons: {
    icon: "/icons/Logo.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const RootLayout = ({ children }: Readonly<Props>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactScan />
      <body>
        <AuthProvider>
          <QueryProvider>
            <StyleProviders>
              <NextIntlClientProvider>{children}</NextIntlClientProvider>
            </StyleProviders>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;

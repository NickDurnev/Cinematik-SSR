import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

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

const RootLayout = async ({ children }: Readonly<Props>) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <ReactScan />
      <body>
        <AuthProvider>
          <QueryProvider>
            <StyleProviders>
              <NextIntlClientProvider messages={messages}>
                {children}
              </NextIntlClientProvider>
            </StyleProviders>
          </QueryProvider>
        </AuthProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
};

export default RootLayout;

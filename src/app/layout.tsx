import { Auth0Provider } from "@auth0/nextjs-auth0";
import type { Metadata } from "next";
import Head from "next/head";
import React from "react";

import QueryProvider from "@/libs/query-provider";

import "react-toastify/dist/ReactToastify.css";
import "@/globals.css";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "CINEMATIK",
  description: "App for searching movies",
};

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang={"en"} suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.svg" />
      </Head>
      <body>
        <QueryProvider>
          <Auth0Provider>{children}</Auth0Provider>
        </QueryProvider>
      </body>
    </html>
  );
}

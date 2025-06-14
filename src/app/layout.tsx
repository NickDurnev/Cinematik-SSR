import type { Metadata } from "next";
import React from "react";

import Providers from "@/components/Providers";
import { auth0 } from "@/libs/auth0";
import QueryProvider from "@/libs/query-provider";
import { Auth0Provider } from "@auth0/nextjs-auth0";

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

export default async function RootLayout({ children }: Readonly<Props>) {
  const session = await auth0.getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <Auth0Provider user={session?.user}>
            <Providers>{children}</Providers>
          </Auth0Provider>
        </QueryProvider>
      </body>
    </html>
  );
}

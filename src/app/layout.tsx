import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";

import { AuthProvider, StyleProviders } from "@/components";
import QueryProvider from "@/libs/query-provider";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "CINEMATIK",
  description: "App for searching movies",
  icons: {
    icon: "/Logo.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const RootLayout = ({ children }: Readonly<Props>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <QueryProvider>
            <AppRouterCacheProvider>
              <StyleProviders>{children}</StyleProviders>
            </AppRouterCacheProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;

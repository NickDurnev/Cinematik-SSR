import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";

import { AuthProvider, StyleProviders } from "@/components";
import QueryProvider from "@/libs/query-provider";
import { getUserProfile } from "@/services/user/service";
import { DEFAULT_USER } from "@/utils/constants";

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

const getProfile = async () => {
  try {
    const response = await getUserProfile();
    if (!response?.email) {
      return { redirect: true };
    }
    return { data: response, redirect: false };
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string" &&
      (error as { message: string }).message.includes("Unauthorized")
    ) {
      return { redirect: true };
    }
    return { redirect: false };
  }
};

const RootLayout = async ({ children }: Readonly<Props>) => {
  const profileResult = await getProfile();
  console.log("🚀 ~ RootLayout ~ profileResult:", profileResult);

  // if (profileResult.redirect) {
  //   redirect("/"); // Perform the redirect here
  // }

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider profileData={profileResult.data ?? DEFAULT_USER}>
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

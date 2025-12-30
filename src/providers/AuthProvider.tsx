"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { createContext, useEffect, useMemo, useState } from "react";

import { UserStore, useUserStore } from "@/hooks/stores";
import { getUserProfile } from "@/services/user/service";
import { usePathname, useRouter } from "next/navigation";

export const OAuthDataContext = createContext({
  oAuthData: {} as Session,
  setOAuthData: (_: Session) => undefined,
} as {
  oAuthData: Session;
  setOAuthData: (data: Session) => void;
});

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [oAuthData, setOAuthData] = useState<Session>({} as Session);
  const setUser = useUserStore((state: UserStore) => state.setUser);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, redirect: shouldRedirect } = await getProfile();
      if (data) {
        setUser(data);
      } else if (shouldRedirect && pathname.startsWith("/app")) {
        router.push("/login");
      }
    };
    fetchProfile();
  }, [setUser, pathname, router]);

  const authContextValue = useMemo(() => {
    return {
      oAuthData,
      setOAuthData,
    };
  }, [oAuthData]);

  return (
    <SessionProvider>
      <OAuthDataContext.Provider value={authContextValue}>
        {children}
      </OAuthDataContext.Provider>
    </SessionProvider>
  );
};

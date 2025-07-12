"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { createContext, useEffect, useMemo, useState } from "react";

import { UserStore, useUserStore } from "@/hooks/stores";
import { IUser } from "@/types/user";

export const OAuthDataContext = createContext({
  oAuthData: {} as Session,
  setOAuthData: (_: Session) => undefined,
} as {
  oAuthData: Session;
  setOAuthData: (data: Session) => void;
});

const AuthProvider = ({
  children,
  profileData,
}: {
  children: React.ReactNode;
  profileData: IUser;
}) => {
  const [oAuthData, setOAuthData] = useState<Session>({} as Session);
  const setUser = useUserStore((state: UserStore) => state.setUser);

  useEffect(() => {
    if (profileData) {
      setUser(profileData);
    }
  }, [profileData, setUser]);

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

export default AuthProvider;

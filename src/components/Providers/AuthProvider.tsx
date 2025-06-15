"use client";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { createContext, useMemo, useState } from "react";

export const OAuthDataContext = createContext({
  oAuthData: {} as Session,
  setOAuthData: (_: Session) => undefined,
} as {
  oAuthData: Session;
  setOAuthData: (data: Session) => void;
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [oAuthData, setOAuthData] = useState<Session>({} as Session);

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

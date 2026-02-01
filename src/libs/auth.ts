import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
  cookies: {
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  callbacks: {
    signIn({ user, account }) {
      console.log("SignIn Callback - userData:", { user, account });
      return true;
    },
    jwt({ token, user, account }) {
      if (user && account) {
        // Add custom data to the token
        token.userData = {
          ...user,
          ...account,
        };
      }
      return token;
    },
    session({ session, token }) {
      // Add custom data from token to the session
      session = {
        ...session,
        ...(token.userData && typeof token.userData === "object"
          ? token.userData
          : {}),
      };
      return session;
    },
  },
  //   pages: {
  //     signIn: "/en/sign-in?ns=true", // Custom sign-in page
  //   },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
};

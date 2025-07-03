"use client";

import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { AppBar, Footer } from "@/components";
import { UserStore, useUserStore } from "@/hooks/stores";
import { addUser } from "@/services/user/service";
import { IAuthUserData } from "@/types/user";

interface IProps {
  children: ReactNode | ReactNode[];
}

const Layout = ({ children }: IProps) => {
  const [skip, setSkip] = useState(false);
  const { data: nextAuthData } = useSession() as { data: Session | null };
  const setUser = useUserStore((state: UserStore) => state.setUser);

  const addUserToDB = async (userData: IAuthUserData) => {
    try {
      const { data } = await addUser(userData);
      setUser(data);
      setSkip(true);
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("An error occurred while adding the user.");
    }
  };

  useEffect(() => {
    if (nextAuthData && !skip) {
      const userData = {
        name: nextAuthData.user?.name ?? "",
        email: nextAuthData?.user?.email ?? "",
        picture: nextAuthData?.user?.image ?? "",
      };
      addUserToDB(userData);
    }
  }, [nextAuthData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-foreground to-accent">
      <AppBar />
      <div className="laptop-l:px-[120px] laptop-m:px-[110px] px-[15px] tablet:px-[60px]">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

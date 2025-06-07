"use client";
import { useUser } from "@auth0/nextjs-auth0";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { UserStore, useUserStore } from "@/hooks/stores";
import { addUser } from "@/services/user/service";
import { IAuthUserData } from "@/services/user/types";

import { AppBar, Footer } from "@/components";

import { Container, Wrap } from "./Layout.styled";

interface IProps {
  children: ReactNode | ReactNode[];
}

const Layout = ({ children }: IProps) => {
  const [skip, setSkip] = useState(false);
  const authData = useUser();
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
    if (authData.user && !skip) {
      const { name, email, locale, picture } = authData.user as IAuthUserData;
      addUserToDB({ name, email, locale, picture });
    }
  }, [authData]);

  return (
    <Container>
      <AppBar />
      <Wrap>
        <main>{children}</main>
        <Footer />
      </Wrap>
    </Container>
  );
};

export default Layout;

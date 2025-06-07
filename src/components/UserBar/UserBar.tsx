"use client";
import { useUser } from "@auth0/nextjs-auth0";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { UserStore, useUserStore } from "@/hooks/stores";

//#Components
import { Avatar, Spinner } from "@/components";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
//#Styles
import { Container } from "./UserBar.styled";

const UserBar = () => {
  const [isSizeScreen, setIsSizeScreen] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setIsSizeScreen("tablet");
    }
  }, []);

  const theme = useTheme();
  const authData = useUser();
  const user = useUserStore((state: UserStore) => state.user);

  const { error, isLoading } = authData;

  if (error) {
    toast.error(error.message);
  }

  return (
    <Container>
      {isLoading && <Spinner />}
      {user ? (
        <div>{isSizeScreen && <Avatar name={user?.name} size={60} />}</div>
      ) : (
        <Button
          variant="text"
          sx={{ color: theme.palette.accentColor.main }}
          href="/api/auth/login"
        >
          Login
        </Button>
      )}
    </Container>
  );
};

export default UserBar;

"use client";
import { Avatar } from "@/components";
//#Components
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
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

  const { user, error, isLoading } = authData;

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <Container>
      {isLoading && <div>Loading...</div>}
      {currentUser ? (
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

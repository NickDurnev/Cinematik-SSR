"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

import { Show, Spinner } from "@/components";
import { Button, styled } from "@mui/material";
import { BsGoogle } from "react-icons/bs";

export const StyledButton = styled(Button)`
  padding: 10px 30px;
  font-family: 'Muller';
  text-transform: uppercase;
  color: #fff;
  font-size: 27px;
  line-height: 27px;
  border: 1px solid #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  row-gap: 10px;
  cursor: pointer;
`;

const LoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/" })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <StyledButton
      onClick={handleLogin}
      aria-label="Login with Google"
      disabled={isLoading}
      startIcon={<BsGoogle size={20} color="#fff" />}
    >
      <Show when={!isLoading} fallback={<Spinner />}>
        Login
      </Show>
    </StyledButton>
  );
};

export default LoginButton;

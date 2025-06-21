"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { toast } from "react-toastify";

import { Show, Spinner } from "@/components";
import { Button } from "@mui/material";

const GoogleIcon = BsGoogle as React.ElementType;

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
    <Button
      className="flex cursor-pointer items-center gap-x-[10px] rounded-[10px] border border-white px-[30px] py-[10px] font-muller text-[27px] text-white uppercase leading-[27px]"
      onClick={handleLogin}
      aria-label="Login with Google"
      disabled={isLoading}
      endIcon={!isLoading && <GoogleIcon size={20} color="#fff" />}
    >
      <Show when={!isLoading} fallback={<Spinner size={20} />}>
        Login
      </Show>
    </Button>
  );
};

export default LoginButton;

"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { toast } from "react-toastify";

import { Button, Show, Spinner } from "@/components";

const GoogleIcon = BsGoogle as React.ElementType;

const GoogleLogin = () => {
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
      onClick={handleLogin}
      aria-label="Login with Google"
      customVariant="ghost"
      disabled={isLoading}
      startIcon={!isLoading && <GoogleIcon size={20} />}
    >
      <Show when={!isLoading} fallback={<Spinner size={20} />}>
        Continue with Google
      </Show>
    </Button>
  );
};

export default GoogleLogin;

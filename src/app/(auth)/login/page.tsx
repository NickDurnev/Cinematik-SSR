"use client";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { ILoginFormSchema } from "@/services/user/schemas";

import { LoginButton } from "@/components";
import { LoginForm } from "../components";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ILoginFormSchema) => {
    setIsLoading(true);
    // TODO: Implement email/password login logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <Box
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-accent-foreground to-ring px-4 tablet:px-0"
      sx={{ fontFamily: "var(--font-muller)" }}
    >
      <Paper
        elevation={6}
        className="w-full laptop:max-w-[420px] laptopM:max-w-[480px] max-w-[350px] tablet:max-w-[400px] rounded-2xl laptop:p-10 p-4 tablet:p-8"
        sx={{
          background: "var(--background)",
        }}
      >
        <Typography
          variant="h4"
          className="mb-4 tablet:mb-6 text-center font-bold laptop:text-[36px] tablet:text-[32px] text-[28px] tracking-wide"
          sx={{
            color: "var(--foreground)",
            fontFamily: "var(--font-muller)",
            fontWeight: 600,
            letterSpacing: "0.1em",
          }}
        >
          Login
        </Typography>
          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
        <Box className="mt-4 text-center">
          <Typography
            variant="body1"
            className="mb-2 tablet:text-lg text-base"
            sx={{ color: "var(--foreground)" }}
          >
            or
          </Typography>
          <LoginButton />
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;

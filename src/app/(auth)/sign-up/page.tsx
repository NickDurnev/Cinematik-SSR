"use client";

import { Box, Paper, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { GoogleLogin } from "@/components";
import { useSignUpUser } from "@/services/user/query-hooks";
import { ISignupFormSchema } from "@/services/user/schemas";

import { SignUpForm } from "../components";

const SignUpPage = () => {
  const { mutate: signUpUser, isPending: isSignUpPending } = useSignUpUser();

  const handleSubmit = (data: ISignupFormSchema) => {
    console.log(" data:", data);
    try {
      signUpUser(data, {
        onSuccess: response => {
          console.log(" response:", response);
        },
        onError: () => {
          toast.error("An error occurred while signing up.");
        },
      });
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "An error occurred while signing up.");
    }
  };

  return (
    <Box
      className="flex min-h-screen items-center justify-center bg-gradient-to-b from-accent-foreground to-accent px-4 tablet:px-0"
      sx={{ fontFamily: "var(--font-muller)" }}
    >
      <Paper
        elevation={6}
        className="z-10 w-full laptop:max-w-[420px] laptopM:max-w-[480px] max-w-[350px] tablet:max-w-[400px] rounded-2xl laptop:p-10 p-4 tablet:p-8"
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
          Sign Up
        </Typography>
        <SignUpForm onSubmit={handleSubmit} isLoading={isSignUpPending} />
        <Box className="mt-4 text-center">
          <Typography
            variant="body1"
            className="mb-2 tablet:text-lg text-base"
            sx={{ color: "var(--foreground)" }}
          >
            or
          </Typography>
          <GoogleLogin />
        </Box>
      </Paper>
    </Box>
  );
};

export default SignUpPage;

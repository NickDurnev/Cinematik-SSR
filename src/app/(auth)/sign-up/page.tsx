"use client";

import { Box, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { toast } from "react-toastify";

import { Button, GoogleLogin } from "@/components";
import { useSignUpUser } from "@/services/user/query-hooks";
import { ISignupFormSchema } from "@/services/user/schemas";

import { SignUpForm } from "../components";

const SignUpPage = () => {
  const { mutate: signUpUser, isPending: isSignUpPending } = useSignUpUser();

  const handleSubmit = ({ email, password, name }: ISignupFormSchema) => {
    const payload = {
      email,
      password,
      name,
    };
    signUpUser(payload, {
      onError: error => {
        toast.error(error?.message);
      },
    });
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
          <Link href="/login" passHref>
            <Button
              customVariant="ghost"
              aria-label="Sign up"
              sx={{ fontSize: 16 }}
            >
              Already have an account?
            </Button>
          </Link>
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

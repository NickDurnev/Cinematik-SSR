"use client";

import { Box, Paper } from "@mui/material";
import Link from "next/link";
import { toast } from "react-toastify";

import { AnimatedPage, Button, GoogleLogin } from "@/components";
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
    <AnimatedPage>
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
          <h3 className="mb-4 tablet:mb-6 text-center font-semibold laptop:text-[36px] tablet:text-[32px] text-[24px] tracking-wide">
            Sign Up
          </h3>
          <SignUpForm onSubmit={handleSubmit} isLoading={isSignUpPending} />
          <Box className="mt-4 text-center">
            <Link href="/login" passHref>
              <Button
                customVariant="ghost"
                aria-label="Sign up"
                className="text-base"
              >
                Already have an account?
              </Button>
            </Link>
            <p className="text-center">or</p>
            <GoogleLogin />
          </Box>
        </Paper>
      </Box>
    </AnimatedPage>
  );
};

export default SignUpPage;

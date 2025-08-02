"use client";

import { Box, Paper, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { useForgotPassword } from "@/services/user/query-hooks";
import { IForgotPasswordFormSchema } from "@/services/user/schemas";

import { ForgotPasswordForm } from "../components";

const ForgotPasswordPage = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (data: IForgotPasswordFormSchema) => {
    forgotPassword(data, {
      onSuccess: response => {
        toast.success(response.message);
      },
      onError: error => {
        console.log(" error:", error);
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
          Forgot Password
        </Typography>
        <ForgotPasswordForm onSubmit={handleSubmit} isLoading={isPending} />
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage;

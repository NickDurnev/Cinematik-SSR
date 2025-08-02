"use client";

import { Box, Paper } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import { useResetPassword } from "@/services/user/query-hooks";
import { IResetPasswordDto } from "@/types/user";

import { ResetPasswordForm } from "../components";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get("token");

  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleSubmit = (data: IResetPasswordDto) => {
    resetPassword(data, {
      onSuccess: response => {
        toast.success(response.message);
        router.replace("/login");
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
        <h3 className="mb-4 tablet:mb-6 text-center font-semibold laptop:text-[36px] tablet:text-[32px] text-[24px] tracking-wide">
          Reset Password
        </h3>
        <ResetPasswordForm
          resetToken={resetToken}
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      </Paper>
    </Box>
  );
};

export default ForgotPasswordPage;

"use client";

import { Box, Paper } from "@mui/material";
import { toast } from "react-toastify";

import { AnimatedPage } from "@/components";
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
    <AnimatedPage>
      <Box className="form-container" sx={{ fontFamily: "var(--font-muller)" }}>
        <Paper
          elevation={6}
          className="z-10 w-full laptop:max-w-[420px] laptopM:max-w-[480px] max-w-[350px] tablet:max-w-[400px] rounded-2xl laptop:p-10 p-4 tablet:p-8"
          sx={{
            background: "var(--background)",
          }}
        >
          <h3 className="mb-4 tablet:mb-6 text-center font-semibold laptop:text-[36px] tablet:text-[32px] text-[24px] tracking-wide">
            Forgot Password
          </h3>
          <ForgotPasswordForm onSubmit={handleSubmit} isLoading={isPending} />
        </Paper>
      </Box>
    </AnimatedPage>
  );
};

export default ForgotPasswordPage;

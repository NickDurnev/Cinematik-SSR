"use client";

import { Box, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

import { AnimatedPage, Button, CustomLink } from "@/components/common";
import { GoogleLogin } from "@/components/landing";
import { useLoginUser } from "@/services/user/query-hooks";
import { ILoginFormSchema } from "@/services/user/schemas";

import { LoginForm } from "../components";

const LoginPage = () => {
  const router = useRouter();
  const t = useTranslations("landing.auth");

  const { mutate: loginUser, isPending: isLoginPending } = useLoginUser();

  const handleSubmit = (data: ILoginFormSchema) => {
    loginUser(data, {
      onSuccess: () => {
        router.replace("/app/home");
      },
      onError: error => {
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
            {t("login")}
          </h3>
          <LoginForm onSubmit={handleSubmit} isLoading={isLoginPending} />
          <Box className="mt-4 flex flex-col gap-y-3 text-center">
            <CustomLink href="/forgot-password" passHref>
              <Button
                customVariant="ghost"
                aria-label="Sign up"
                sx={{ fontSize: 16 }}
              >
                {t("forgotPassword")}?
              </Button>
            </CustomLink>
            <Box className="text-center">
              <CustomLink href="/sign-up" passHref>
                <Button
                  customVariant="ghost"
                  aria-label="Sign up"
                  className="text-base"
                >
                  {t("notAccount")}?
                </Button>
              </CustomLink>
              <p className="text-center">{t("or")}</p>
              <GoogleLogin />
            </Box>
          </Box>
        </Paper>
      </Box>
    </AnimatedPage>
  );
};

export default LoginPage;

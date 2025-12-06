"use client";

import { Box, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

import { AnimatedPage, Button, CustomLink } from "@/components/common";
import { GoogleLogin } from "@/components/landing";
import { useSignUpUser } from "@/services/user/query-hooks";
import { ISignupFormSchema } from "@/services/user/schemas";

import { SignUpForm } from "../components";

const SignUpPage = () => {
  const router = useRouter();
  const t = useTranslations("landing.auth");

  const { mutate: signUpUser, isPending: isSignUpPending } = useSignUpUser();

  const handleSubmit = ({ email, password, name }: ISignupFormSchema) => {
    const payload = {
      email,
      password,
      name,
    };
    signUpUser(payload, {
      onSuccess: () => {
        //TODO Add confirm email step later
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
            {t("signUp")}
          </h3>
          <SignUpForm onSubmit={handleSubmit} isLoading={isSignUpPending} />
          <Box className="mt-4 text-center">
            <CustomLink href="/login" passHref>
              <Button
                customVariant="ghost"
                aria-label="Sign up"
                className="text-base"
              >
                {t("alreadyHaveAccount")}?
              </Button>
            </CustomLink>
            <p className="text-center">{t("or")}</p>
            <GoogleLogin />
          </Box>
        </Paper>
      </Box>
    </AnimatedPage>
  );
};

export default SignUpPage;

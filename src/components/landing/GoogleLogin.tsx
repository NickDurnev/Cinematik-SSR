"use client";

import GoogleIcon from "@mui/icons-material/Google";
import type { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useSocialLoginUser } from "@/services/user/query-hooks";
import { INextAuthUserData } from "@/types/user";

import { Button } from "../common";

export const GoogleLogin = () => {
  const t = useTranslations("landing.auth");
  const [isLoading, setIsLoading] = useState(false);
  const { data: nextAuthData } = useSession() as { data: Session | null };
  const { mutate: socialLoginUser, isPending: isLoginPending } =
    useSocialLoginUser();

  const handleLogin = () => {
    setIsLoading(true);
    signIn("google", { callbackUrl: "/login" })
      .catch(error => {
        toast.error(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const socialLogin = useCallback(
    (data: INextAuthUserData) => {
      const payload = {
        email: data.email,
        name: data.name,
        picture: data.picture,
      };
      socialLoginUser(payload, {
        onSuccess: response => {
          console.log(" response:", response);
        },
        onError: error => {
          console.log(" error:", error);
          toast.error(error?.message);
        },
      });
    },
    [socialLoginUser],
  );

  useEffect(() => {
    if (nextAuthData) {
      const userData = {
        name: nextAuthData.user?.name ?? "",
        email: nextAuthData?.user?.email ?? "",
        picture: nextAuthData?.user?.image ?? "",
      };
      socialLogin(userData);
    }
  }, [nextAuthData, socialLogin]);

  return (
    <Button
      onClick={handleLogin}
      aria-label={t("continueWithGoogle")}
      customVariant="ghost"
      disabled={isLoading}
      sx={{ fontSize: 16 }}
      loading={isLoginPending || isLoading}
      loadingPosition="start"
      startIcon={(!isLoading || !isLoginPending) && <GoogleIcon />}
    >
      {t("continueWithGoogle")}
    </Button>
  );
};

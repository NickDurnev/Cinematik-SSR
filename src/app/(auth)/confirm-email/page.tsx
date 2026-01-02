"use client";

import { Alert, Box, Paper } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Suspense, useEffect, useState } from "react";

import { AnimatedPage, Spinner } from "@/components/common";
import { useConfirmEmail } from "@/services/user/query-hooks";

function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  const { mutate: confirmEmail } = useConfirmEmail();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing confirmation token.");
      return;
    }

    const handleConfirm = () => {
      confirmEmail(token, {
        onSuccess: data => {
          setStatus("success");
          setMessage(data.message);

          // Redirect to login after a short delay
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        },
        onError: error => {
          setStatus("error");
          setMessage(error.message);
        },
      });
    };

    handleConfirm();
  }, [token, confirmEmail, router]);

  return (
    <>
      {status === "loading" && <Spinner size={32} />}
      {status === "success" && (
        <Alert severity="success" sx={{ width: "100%", maxWidth: 400 }}>
          {message}. Redirecting...
        </Alert>
      )}
      {status === "error" && (
        <Alert severity="error" sx={{ width: "100%", maxWidth: 400 }}>
          {message}
        </Alert>
      )}
    </>
  );
}

export default function ConfirmEmailPage() {
  const t = useTranslations("landing.auth");

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
            {t("confirmEmail")}
          </h3>
          <div className="flex w-full items-center justify-center py-8">
            <Suspense fallback={<Spinner size={32} />}>
              <ConfirmEmailContent />
            </Suspense>
          </div>
        </Paper>
      </Box>
    </AnimatedPage>
  );
}

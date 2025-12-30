"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { confirmEmail } from "@/services/user/service";
import { Box, Alert, Paper } from "@mui/material";
import { AnimatedPage, Spinner } from "@/components/common";
import { useTranslations } from "next-intl";

function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing confirmation token.");
      return;
    }

    const handleConfirm = async () => {
      try {
        const result = await confirmEmail(token);
        setStatus("success");
        setMessage(result.message);
        
        // Redirect to login after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } catch (error: any) {
        setStatus("error");
        setMessage(error.message || "Failed to confirm email.");
      }
    };

    handleConfirm();
  }, [token, router]);

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
          <Suspense fallback={<Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><Spinner size={32} /></Box>}>
            <ConfirmEmailContent />
          </Suspense>
        </Paper>
      </Box>
    </AnimatedPage>
  );
}


"use client";

import { Box, IconButton, Typography } from "@mui/material";
import type { ToastContentProps } from "react-toastify";
import Close from "@mui/icons-material/Close";

export interface AppNotificationToastData {
  title: string;
  message?: string;
  onGoToPairs?: () => void;
}

export function AppNotificationToast({
  closeToast,
  data,
}: ToastContentProps<AppNotificationToastData>) {
  const payload = data ?? { title: "" };

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[aria-label="Close"]')) {
      return;
    }
    payload.onGoToPairs?.();
    closeToast();
  };

  return (
    <Box
      component={payload.onGoToPairs ? "button" : "div"}
      type={payload.onGoToPairs ? "button" : undefined}
      onClick={handleClick}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        pr: 4,
        py: 0.5,
        width: "100%",
        border: "none",
        background: "transparent",
        textAlign: "left",
        cursor: payload.onGoToPairs ? "pointer" : "default",
        font: "inherit",
      }}
      aria-label={payload.onGoToPairs ? "Click to go to Pairs" : undefined}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          {payload.title}
        </Typography>
        {payload.message && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {payload.message}
          </Typography>
        )}
      </Box>
      <IconButton
        size="small"
        onClick={e => {
          e.stopPropagation();
          closeToast();
        }}
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          color: "text.secondary",
        }}
        aria-label="Close"
      >
        <Close fontSize="small" />
      </IconButton>
    </Box>
  );
}

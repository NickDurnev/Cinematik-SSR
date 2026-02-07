"use client";

import { Box, IconButton, Typography } from "@mui/material";
import type { ToastContentProps } from "react-toastify";
import Close from "@mui/icons-material/Close";

export function PairRequestAcceptedToastContent({
  closeToast,
}: ToastContentProps<Record<string, never>>) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        pr: 4,
        py: 0.5,
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          Pair Request Accepted! 🎉
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Your pair request was accepted!
        </Typography>
      </Box>
      <IconButton
        size="small"
        onClick={closeToast}
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

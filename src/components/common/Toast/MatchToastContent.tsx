"use client";

import { Box, IconButton, Typography } from "@mui/material";
import type { ToastContentProps } from "react-toastify";
import Close from "@mui/icons-material/Close";

export interface MatchToastData {
  title: string;
  poster_path: string | null;
}

const POSTER_BASE = "https://image.tmdb.org/t/p/w92";

export function MatchToastContent({
  closeToast,
  data,
}: ToastContentProps<MatchToastData>) {
  const payload = data ?? { title: "", poster_path: null };
  const posterUrl = payload.poster_path
    ? `${POSTER_BASE}${payload.poster_path}`
    : null;

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
      {posterUrl && (
        <Box
          component="img"
          src={posterUrl}
          alt=""
          sx={{
            width: 48,
            height: 72,
            objectFit: "cover",
            borderRadius: 1,
            flexShrink: 0,
          }}
        />
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          New Match! 🎉
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          You both liked &quot;{payload.title}&quot;!
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

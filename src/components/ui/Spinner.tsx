"use client";
import CircularProgress from "@mui/material/CircularProgress";

interface SpinnerProps {
  size?: number;
}

const Spinner = ({ size = 20 }: SpinnerProps) => {
  return (
    <>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        size={size}
        sx={{
          "svg circle": { stroke: "url(#my_gradient)" },
        }}
      />
    </>
  );
};

export default Spinner;

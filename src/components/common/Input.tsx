import { TextField, TextFieldProps } from "@mui/material";

const DEFAULT_INPUT_STYLES = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "var(--primary)",
    },
    "&:hover fieldset": {
      borderColor: "var(--foreground)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--foreground)",
    },
  },
};

export const Input = ({ sx, ...props }: TextFieldProps) => {
  return (
    <div className="interactive relative">
      <TextField
        {...props}
        fullWidth
        margin="normal"
        slotProps={{
          inputLabel: { style: { color: "var(--foreground)" } },
          htmlInput: {
            style: {
              color: "var(--foreground)",
              background: "transparent",
              borderRadius: 10,
              fontSize: 16,
            },
          },
        }}
        sx={[
          DEFAULT_INPUT_STYLES,
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      />
    </div>
  );
};

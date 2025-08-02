import { TextField, TextFieldProps } from "@mui/material";

const defaultSx = {
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

const Input = ({ sx, ...props }: TextFieldProps) => {
  return (
    <div className="motion-preset-pop motion-loop-once relative">
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
        sx={[defaultSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
      />
    </div>
  );
};

export default Input;

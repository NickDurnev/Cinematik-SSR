import { ButtonProps, Button as MuiButton } from "@mui/material";

import { cn } from "@/libs/tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

const defaultSx = {
  borderColor: "var(--primary)",
  color: "var(--foreground)",
  fontSize: 20,
  borderRadius: "10px",
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "var(--primary)",
    color: "var(--background)",
    borderColor: "var(--primary)",
  },
  "&.Mui-focusVisible": {
    color: "var(--background)",
    borderColor: "var(--primary)",
  },
  "&.Mui-disabled": {
    color: "var(--muted-foreground)",
    borderColor: "var(--muted)",
  },
};

const variantSx: Record<ButtonVariant, object> = {
  primary: {
    ...defaultSx,
  },
  secondary: {
    ...defaultSx,
    backgroundColor: "var(--secondary)",
    color: "var(--secondary-foreground)",
    borderColor: "var(--secondary)",
    "&:hover": {
      backgroundColor: "var(--secondary-hover)",
      color: "var(--secondary-foreground)",
      borderColor: "var(--secondary-hover)",
    },
  },
  ghost: {
    ...defaultSx,
    backgroundColor: "transparent",
    borderColor: "transparent",
    "&:hover": {
      color: "var(--primary)",
    },
  },
  destructive: {
    ...defaultSx,
    backgroundColor: "var(--destructive)",
    color: "var(--destructive-foreground)",
    borderColor: "var(--destructive)",
    "&:hover": {
      backgroundColor: "var(--destructive-hover)",
      color: "var(--destructive-foreground)",
      borderColor: "var(--destructive-hover)",
    },
  },
};

type Props = ButtonProps & {
  className?: string;
  customVariant?: ButtonVariant;
};

const Button = ({
  children,
  className,
  sx,
  customVariant = "primary",
  ...props
}: Props) => {
  const selectedVariant = variantSx[customVariant];

  return (
    <MuiButton
      {...props}
      className={cn(
        // "color-foreground rounded-[10px] border border-foreground font-muller text-[20px] uppercase leading-[20px]",
        className,
      )}
      sx={[selectedVariant, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

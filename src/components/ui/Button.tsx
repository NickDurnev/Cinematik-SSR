import { ButtonProps, Button as MuiButton } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import { cn } from "@/libs/tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

const iconButtonSx = {
  color: "var(--foreground)",
  "&:hover": {
    color: "var(--primary)",
  },
  "&.Mui-focusVisible": {
    color: "var(--primary)",
  },
  "&.Mui-disabled": {
    color: "var(--muted-foreground)",
  },
};

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
  isIconButton?: boolean;
};

const Button = ({
  children,
  className,
  sx,
  customVariant = "primary",
  isIconButton = false,
  ...props
}: Props) => {
  const selectedVariant = variantSx[customVariant];

  if (isIconButton) {
    return (
      <IconButton
        {...props}
        className={cn(className, "rounded-full p-2")}
        sx={[iconButtonSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
      >
        {children}
      </IconButton>
    );
  }

  return (
    <MuiButton
      {...props}
      className={cn(className)}
      sx={[selectedVariant, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

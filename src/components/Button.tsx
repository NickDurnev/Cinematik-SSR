import { Button as MuiButton, ButtonProps } from "@mui/material";
import { cn } from "@/libs/tailwind-merge";

const defaultSx = {
    borderColor: "var(--primary)",
    color: "var(--foreground)",
    "&:hover": {
        backgroundColor: "var(--primary)",
        color: "var(--background)",
        borderColor: "var(--primary)",
    },
    "&.Mui-focusVisible": {
        // backgroundColor: "var(--primary)",
        color: "var(--background)",
        borderColor: "var(--primary)",
    },
    "&.Mui-disabled": {
        // backgroundColor: "var(--muted)",
        color: "var(--muted-foreground)",
        borderColor: "var(--muted)",
    },
};

type Props = ButtonProps & {
    className?: string,
}

const Button = ({ children, className, sx, ...props }: Props) => {
    return (
        <MuiButton
            {...props}
            className={cn("rounded-[10px] border border-foreground color-foreground font-muller text-[20px] uppercase leading-[20px]", className)}
            sx={[defaultSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        >
            {children}
        </MuiButton>
    )
}

export default Button
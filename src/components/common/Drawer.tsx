import SwipeableDrawer, {
  SwipeableDrawerProps,
} from "@mui/material/SwipeableDrawer";
import type { ReactNode } from "react";

type Props = Omit<SwipeableDrawerProps, "onOpen" | "onClose"> & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
};

const DEFAULT_DRAWER_PAPER_STYLES = {
  backgroundColor: "var(--secondary)",
  color: "var(--foreground)",
};

export const Drawer = ({ isOpen, setIsOpen, children, sx }: Props) => {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  return (
    <div>
      <SwipeableDrawer
        anchor={"bottom"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{
          sx: [
            DEFAULT_DRAWER_PAPER_STYLES,
            ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
          ],
        }}
      >
        <div className="mx-auto my-3 h-1 w-[50px] rounded-full bg-foreground" />
        {children}
      </SwipeableDrawer>
    </div>
  );
};

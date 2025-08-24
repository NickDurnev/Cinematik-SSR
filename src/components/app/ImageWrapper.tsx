import { ReactNode } from "react";

import { cn } from "@/libs/tailwind-merge";

type ImageWrapperProps = {
  children: ReactNode;
  className?: string;
};

export const ImageWrapper = ({ children, className }: ImageWrapperProps) => (
  <div
    className={cn(
      "flex h-full w-full items-center justify-center rounded-tl-[10px] rounded-tr-[10px] bg-bg-cast-card text-link",
      className,
    )}
  >
    {children}
  </div>
);

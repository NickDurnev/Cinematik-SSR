"use client";

import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

import { cn } from "@/libs/tailwind-merge";

interface IProps {
  children: ReactNode;
}

export const MovieList = ({ children }: IProps) => {
  const baseClasses = "mx-auto block w-[310px]";
  const spacingClasses = "[&>li+li]:mt-5";
  const tabletClasses =
    "tablet:grid tablet:w-[640px] tablet:grid-cols-2 tablet:items-stretch tablet:justify-items-center tablet:gap-5 tablet:whitespace-nowrap";
  const responsiveClasses =
    "laptopM:w-full laptopM:grid-cols-4 laptopL:grid-cols-5";

  return (
    <ul
      className={cn(
        baseClasses,
        spacingClasses,
        tabletClasses,
        responsiveClasses,
      )}
    >
      <AnimatePresence>{children}</AnimatePresence>
    </ul>
  );
};

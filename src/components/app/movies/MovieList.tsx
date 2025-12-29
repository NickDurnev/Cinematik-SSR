"use client";

import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

import { cn } from "@/libs/tailwind-merge";
import {
  BASE_CARD_CLASSES,
  RESPONSIVE_CARD_CLASSES,
  TABLET_CARD_CLASSES,
} from "@/utils/constants";

interface IProps {
  children: ReactNode;
}

export const MovieList = ({ children }: IProps) => {
  const spacingClasses = "[&>li+li]:mt-5";

  return (
    <ul
      className={cn(
        BASE_CARD_CLASSES,
        spacingClasses,
        TABLET_CARD_CLASSES,
        RESPONSIVE_CARD_CLASSES,
      )}
    >
      <AnimatePresence>{children}</AnimatePresence>
    </ul>
  );
};

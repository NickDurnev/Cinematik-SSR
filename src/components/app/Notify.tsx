"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import { itemVariants } from "@/utils/animations";

interface IProps {
  children: ReactNode;
  delay?: number;
}

export const Notify = ({ children, delay = 0 }: IProps) => (
  <motion.div
    initial={"closed"}
    animate={"open"}
    variants={itemVariants(delay)}
    className="w-full rounded-[5px] p-5 text-center text-[var(--color-text)]"
  >
    {children}
  </motion.div>
);

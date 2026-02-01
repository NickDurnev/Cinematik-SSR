"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  children: ReactNode;
};

export const DropMenu = ({ isOpen, children }: Props) => {
  return (
    <div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
        style={{ overflow: "hidden", willChange: "height" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

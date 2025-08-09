"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { pageVariants } from "@/utils/animations";

export default function AnimatedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Animation variants for sliding left/right

  // <AnimatePresence mode="wait" custom={direction}>
  //   <motion.section
  //     key={pathname}
  //     custom={direction}
  //     variants={sliderVariants}
  //     initial="initial"
  //     animate="animate"
  //     exit="exit"
  //     transition={{ type: "tween", duration: 0.4 }}
  //     style={{ position: "absolute", width: "100%" }}
  //   >
  //     {children}
  //   </motion.section>
  // </AnimatePresence>

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
}

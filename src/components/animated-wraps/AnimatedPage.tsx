"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AnimatedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Animation variants for sliding left/right
  // const variants = {
  //   initial: (direction: "forward" | "backward") => ({
  //     x: direction === "forward" ? "100vw" : "-100vw",
  //     opacity: 0,
  //   }),
  //   animate: { x: 0, opacity: 1 },
  //   exit: (direction: "forward" | "backward") => ({
  //     x: direction === "forward" ? "-100vw" : "100vw",
  //     opacity: 0,
  //   }),
  // };

  // <AnimatePresence mode="wait" custom={direction}>
  //   <motion.section
  //     key={pathname}
  //     custom={direction}
  //     variants={variants}
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
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.section>
    </AnimatePresence>
  );
}

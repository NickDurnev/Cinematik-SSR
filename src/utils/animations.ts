export const itemVariants = (custom = 0) => ({
  open: { opacity: 1, y: 0, transition: { delay: custom + 0.5 } },
  closed: { opacity: 0, y: "50%" },
  exit: {
    opacity: 0,
    y: 0,
    transition: { duration: 0.3, delay: custom + 0.3 },
  },
});

export const modalVariants = {
  open: { opacity: 1, scale: 1.0, x: "-50%", y: "-50%" },
  closed: { opacity: 0, scale: 0.7, x: "-50%", y: "-50%" },
};

export const pageVariants = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 0 },
};

export const sliderVariants = {
  initial: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? "100vw" : "-100vw",
    opacity: 0,
  }),
  animate: { x: 0, opacity: 1 },
  exit: (direction: "forward" | "backward") => ({
    x: direction === "forward" ? "-100vw" : "100vw",
    opacity: 0,
  }),
};

export const cardVariants = {
  open: { opacity: 1, scale: 1 },
  closed: { opacity: 0, scale: 0.5 },
};

export const pageInfoVariants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

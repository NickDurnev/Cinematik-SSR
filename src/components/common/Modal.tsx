"use client";

import { motion } from "framer-motion";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/libs/tailwind-merge";
import { modalVariants } from "@/utils/animations";

interface IProps {
  children: ReactNode;
  onModal?: (value: boolean) => void;
  className?: string;
}

export const Modal = (props: IProps) => {
  const { children, onModal, className, ...rest } = props;
  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    setModalRoot(document.querySelector("#modal-root"));
  }, []);

  const onClickClose: MouseEventHandler<HTMLDivElement> = e => {
    if (e.target === e.currentTarget && onModal) {
      onModal(false);
    }
  };

  const onKeyDownClose: React.KeyboardEventHandler<HTMLDivElement> = e => {
    if (e.key === "Escape" && onModal) {
      onModal(false);
    }
  };

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div
      onClick={onClickClose}
      onKeyDown={onKeyDownClose}
      className="fixed inset-0 z-50 h-full w-full overflow-y-scroll bg-backdrop text-foreground"
    >
      <motion.div
        initial="closed"
        animate="open"
        exit="closed"
        variants={modalVariants}
        className={cn(
          "translate(-50%, -50%) absolute top-[50%] left-[50%] z-50 overflow-hidden rounded-[5px] bg-transparent text-center font-medium",
          // bcgcolor ? "bg-[#aba7a731]" : "bg-transparent",
          className,
        )}
        // style={{
        //   transform: positiony || positionx ? "none" : "translate(-50%, -50%)",
        //   padding: padding,
        // }}
        {...rest}
      >
        {children}
      </motion.div>
    </div>,
    modalRoot,
  );
};

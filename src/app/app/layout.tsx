"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

import { AppBar, Container, Header } from "@/components/app";
import { useSearchValueSetter } from "@/hooks/stores";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const setSearchValue = useSearchValueSetter();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <section className="relative mx-auto flex min-h-screen max-w-screen bg-gradient-to-b from-grad-light to-grad-dark text-center text-foreground shadow-[var(--theme-box-shadow)] [&>h1]:mb-2.5 [&>h1]:text-foreground [&>h2]:mb-2.5 [&>h2]:text-foreground">
          <AppBar />
          <Container>
            <Header onChange={setSearchValue} />
            {children}
          </Container>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}

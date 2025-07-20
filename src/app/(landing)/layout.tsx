"use client";

import { ReactNode } from "react";

import { AppBar, Footer } from "@/components";
import Spinner from "@/components/ui/Spinner";
import { useUserStoreHydrated } from "@/hooks/stores";

interface IProps {
  children: ReactNode | ReactNode[];
}

const Layout = ({ children }: IProps) => {
  const hydrated = useUserStoreHydrated();
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-foreground to-accent">
      {hydrated ? (
        <AppBar />
      ) : (
        <div className="flex w-full items-center justify-center py-8">
          <Spinner size={32} />
        </div>
      )}
      <div className="laptop-l:px-[120px] laptop-m:px-[110px] px-[15px] tablet:px-[60px]">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

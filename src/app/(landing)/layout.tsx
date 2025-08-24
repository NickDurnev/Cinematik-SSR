"use client";

import { ReactNode } from "react";

import { AppBar, Footer, Spinner } from "@/components";
import { useUserStoreHydrated } from "@/hooks/stores";

interface IProps {
  children: ReactNode | ReactNode[];
}

//TODO Replace hydrated logic to AppBar, make layout SSR

const Layout = ({ children }: IProps) => {
  const hydrated = useUserStoreHydrated();
  return (
    <div className="min-h-screen bg-gradient-to-b from-grad-light to-grad-dark">
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

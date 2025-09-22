import { ReactNode } from "react";

import { Footer, LandingBar } from "@/components";

interface IProps {
  children: ReactNode | ReactNode[];
}

const Layout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-grad-light to-grad-dark">
      <LandingBar />
      <div className="laptop-l:px-[120px] laptop-m:px-[110px] px-[15px] tablet:px-[60px]">
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;

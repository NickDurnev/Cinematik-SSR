import Image from "next/image";
import React from "react";

import { BackButton } from "@/components/common";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav className="bg-grad-light tablet:py-4">
        <BackButton backupUrl="/login" />
      </nav>

      <div className="-left-[100px] laptopL:-left-[20px] absolute laptopL:top-[40px] tablet:top-[50px] top-[30px] tablet:left-[70px] h-[302px] laptopL:h-[635px] tablet:h-[700px] laptopL:w-[635px] tablet:w-[700px] w-[302px]">
        <Image
          src="/Splash-min.png"
          alt="Splash"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {children}
    </>
  );
};

export default AuthLayout;

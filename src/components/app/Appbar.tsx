import Image from "next/image";

import Navigation from "./Navigation";

export const AppBar = () => {
  return (
    <header className="fixed tablet:relative bottom-0 left-0 z-30 h-[50px] tablet:h-auto tablet:laptopL:w-[120px] tablet:laptopM:w-[90px] tablet:w-[80px] w-full bg-nav-bar-bg shadow-[0px_4px_4px_rgba(0,0,0,0.25)] backdrop-blur-[12px]">
      <div className="tablet:sticky tablet:top-0 tablet:left-0 h-full w-full tablet:py-[25px]">
        <Image
          src="/icons/Logo.svg"
          alt="Logo"
          width={40}
          height={40}
          className="mx-auto tablet:block hidden h-[40px] tablet:h-[75px] tablet:w-[75px] w-[40px]"
        />
        <Navigation />
      </div>
    </header>
  );
};

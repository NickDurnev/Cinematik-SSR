import LogoIcon from "/icons/Logo.svg";

import Navigation from "./Navigation";

const AppBar = () => {
  return (
    <header className="relative h-auto laptopL:w-[120px] laptopM:w-[90px] tablet:w-[80px] w-[50px] bg-nav-bar-bg shadow-[0px_4px_4px_rgba(0,0,0,0.25)] backdrop-blur-[12px]">
      <div className="sticky top-0 left-0 w-full py-[25px]">
        <LogoIcon className="h-[40px] tablet:h-[75px] tablet:w-[75px] w-[40px]" />
        <Navigation />
      </div>
    </header>
  );
};

export default AppBar;

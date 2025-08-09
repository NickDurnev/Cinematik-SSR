import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Container = ({ children }: Props) => {
  return (
    <div className="laptopM:w-[calc(100vw-120px)] tablet:w-[calc(100vw-80px)] w-[calc(100vw-50px)] flex-grow overflow-hidden laptopL:p-[85px] p-[5px] tablet:p-[15px] laptopL:pr-[50px]">
      {children}
    </div>
  );
};

export default Container;

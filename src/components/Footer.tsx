import Image from "next/image";
import useSizeScreen from "@/hooks/useSizeScreen";

const Footer = () => {
  const isSizeScreen = useSizeScreen();

  return (
    <footer className="w-full laptopL:pb-[85px] pb-[54px] tablet:pb-[65px]">
      <section>
        <div className="m-0 flex w-[170px] items-center">
          {isSizeScreen === "phone" ? (
            <Image src="/Logo.svg" width={42} height={48} alt="Logo" />
          ) : (
            <Image src="/Logo.svg" width={58} height={65} alt="Logo" />
          )}
          <p className="font-semibold text-mainText text-xl leading-6 tracking-[0.2em]">
            CINEMATIK
          </p>
        </div>
        <div className="mt-4 flex justify-between">
          <p className="font-normal tablet:text-xl text-mainText text-sm leading-4 tablet:leading-5 tracking-[0.1em]">
            Crafted by Dumb Gooses Labs
          </p>
          <p className="font-normal tablet:text-xl text-mainText text-sm leading-4 tablet:leading-5 tracking-[0.1em]">
            2023
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;

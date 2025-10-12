import Image from "next/image";
import { useTranslations } from "next-intl";

import { AppLink } from "@/app/[locale]/(landing)/components";

export const Hero = () => {
  const tHome = useTranslations("landing.home");
  const tUniversal = useTranslations("universal");

  return (
    <section className="laptopL:pt-[70px] laptopM:pt-[60px] pt-[55px]">
      <h1 className="mb-10 laptopL:w-[calc(100vw-240px)] laptopM:w-[calc(100vw-220px)] w-full font-technovier laptopL:text-[80px] laptopM:text-[60px] tablet:text-[50px] text-[35px] text-foreground uppercase laptopL:leading-[120px] laptopM:leading-[100px] leading-[41px] tablet:leading-[70px] tracking-wider">
        {tUniversal("movies")} <br />
        {tHome("heroTitle")}
      </h1>
      <section className="laptop:flex laptopL:w-[1550px] laptop:items-end laptop:gap-x-[60vw]">
        <div className="relative h-[420px] laptopL:h-[650px]">
          <div className="-left-[130px] tablet:-left-[50px] laptopL:-left-[60px] absolute laptopL:top-[40px] tablet:top-[50px] top-[30px] h-[302px] laptopL:h-[635px] tablet:h-[445px] laptopL:w-[635px] tablet:w-[445px] w-[302px]">
            <Image
              src="/Splash-min.png"
              alt="Splash"
              width={1266}
              height={1266}
            />
          </div>
          <div className="absolute top-0 laptopL:left-[170px] laptopM:left-[190px] left-[110px] tablet:left-[100px] h-[365px] laptopL:h-[580px] tablet:h-[465px] laptopL:w-[900px] tablet:w-[625px] w-[190px]">
            {/* Phone (default) */}
            <Image
              src="/IPhone-min.png"
              alt="Phone"
              width={365}
              height={195}
              className="tablet:hidden"
            />
            {/* Tablet only */}
            <Image
              src="/Ipad-min.png"
              alt="Tablet"
              width={1248}
              height={932}
              className="tablet:block hidden laptop:hidden"
            />
            {/* Laptop and up */}
            <Image
              src="/MacBook Pro-min.png"
              alt="Laptop"
              width={900}
              height={580}
              className="laptop:block hidden"
            />
          </div>
        </div>
        <AppLink />
      </section>
    </section>
  );
};

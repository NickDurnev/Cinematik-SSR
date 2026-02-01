"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

const companyLogos = [
  {
    src: "/icons/Paramount_Pictures_Corporation_logo.svg",
    width: 150,
    height: 90,
    alt: "Paramount Pictures Logo",
  },
  {
    src: "/icons/21 Century Fox.svg",
    width: 140,
    height: 115,
    alt: "21 Century Fox Logo",
  },
  {
    src: "/icons/Universal_Pictures_logo.svg",
    width: 150,
    height: 110,
    alt: "Universal Pictures Logo",
  },
  {
    src: "/icons/Disney_wordmark.svg",
    width: 150,
    height: 80,
    alt: "Disney Logo",
  },
  {
    src: "/icons/Marvel_Studios_2016_logo.svg",
    width: 250,
    height: 60,
    alt: "Marvel Studios Logo",
  },
];

export const Companies = () => {
  const tHome = useTranslations("landing.home");
  const tUniversal = useTranslations("universal");

  return (
    <section className="flex laptopL:w-[1150px] laptopM:w-[1000px] w-full flex-col gap-y-12 py-[100px] tablet:text-left text-center">
      <h3 className="tablet:text-[30px] text-base leading-4 tablet:leading-5 tracking-wide">
        <span className="capitalize">{tUniversal("movies")}</span>{" "}
        {tHome("companiesTitle")}
      </h3>
      <div className="tablet:flex grid grid-cols-2 tablet:flex-nowrap items-center justify-center tablet:justify-between gap-x-10">
        {companyLogos.map(logo => (
          <div
            key={logo.src}
            className="mb-10 tablet:mb-0 flex tablet:w-1/2 w-full justify-center"
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

"use client";
import Image from "next/image";

const Companies = () => {
  return (
    <section className="laptopL:w-[1150px] laptopM:w-[1000px] w-full py-[100px] tablet:text-left text-center">
      <h3 className="mb-[50px] tablet:mb-[65px] tablet:text-xl text-base text-mainText leading-4 tablet:leading-5">
        Movies by the biggest names in the industry
      </h3>
      <div className="flex flex-wrap tablet:flex-nowrap items-center justify-center tablet:justify-between">
        <div className="laptopM:mr-[40px] tablet:mr-[30px] mb-10 tablet:mb-0 w-1/2">
          <Image
            src="/Paramount_Pictures_Corporation_logo.svg"
            alt="Logo"
            width={150}
            height={90}
          />
        </div>
        <div className="laptopM:mr-[40px] tablet:mr-[30px] mb-10 tablet:mb-0 w-1/2">
          <Image
            src="/21 Century Fox.svg"
            alt="Logo"
            width={140}
            height={115}
          />
        </div>
        <div className="laptopM:mr-[40px] tablet:mr-[30px] mb-10 tablet:mb-0 w-1/2">
          <Image
            src="/Universal_Pictures_logo.svg"
            alt="Logo"
            width={150}
            height={110}
          />
        </div>
        <div className="laptopM:mr-[40px] tablet:mr-[30px] mb-10 tablet:mb-0 w-1/2">
          <Image
            src="/Disney_wordmark.svg"
            alt="Logo"
            width={150}
            height={80}
          />
        </div>
        <div className="laptopM:mr-0 tablet:mr-[75px] mb-0 tablet:h-auto w-1/2">
          <Image
            src="/Marvel_Studios_2016_logo.svg"
            alt="Logo"
            width={250}
            height={60}
          />
        </div>
      </div>
    </section>
  );
};

export default Companies;

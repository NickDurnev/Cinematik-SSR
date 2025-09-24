"use client";

import { useEffect, useState } from "react";

import useSizeScreen from "@/hooks/useSizeScreen";
import { ScreenType } from "@/types/general";

const getItemsLength = (screenSize: ScreenType | null) => {
  console.log("🚀 ~ screenSize:", screenSize);
  switch (screenSize) {
    case ScreenType.PHONE:
      return 1;
    case ScreenType.TABLET:
      return 2;
    case ScreenType.LAPTOP:
      return 3;
    case ScreenType.LAPTOPM:
      return 4;
    case ScreenType.LAPTOPL:
      return 5;
    case ScreenType.DESKTOP:
      return 6;
    default:
      return 1;
  }
};

export const CardSkeleton = () => (
  <div className="flex w-[310px] shrink-0 flex-col items-center">
    <div className="h-[465px] w-[310px] animate-pulse rounded-md bg-bg-icon" />
    <div className="mt-2 h-[30px] w-[310px] animate-pulse rounded-md bg-bg-icon" />
  </div>
);

export const GallerySkeleton = () => {
  const screenSize = useSizeScreen();
  const [itemsLength, setItemsLength] = useState(0);

  useEffect(() => {
    setItemsLength(getItemsLength(screenSize));
  }, [screenSize]);

  return (
    <div className="mx-auto block tablet:grid w-full desktop:grid-cols-6 laptop:grid-cols-3 laptopL:grid-cols-5 laptopM:grid-cols-4 tablet:grid-cols-2 items-stretch justify-items-center gap-5 space-y-5 tablet:space-y-0">
      {Array.from({ length: itemsLength * 5 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export const SwiperSkeleton = () => {
  const screenSize = useSizeScreen();
  const [itemsLength, setItemsLength] = useState(0);
  console.log("🚀 ~ itemsLength:", itemsLength);

  useEffect(() => {
    setItemsLength(getItemsLength(screenSize));
  }, [screenSize]);

  return (
    <div className="mx-auto flex w-full items-center gap-x-5">
      {Array.from({ length: itemsLength }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

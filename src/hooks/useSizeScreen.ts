"use client";

import { useEffect, useState } from "react";

import { ScreenType } from "@/types/general";
import { device } from "@/utils/deviceSizes";

const useSizeScreen = () => {
  const [isSizeScreen, setIsSizeScreen] = useState<ScreenType | null>(null);

  useEffect(() => {
    switch (true) {
      case window.matchMedia(device.desktop).matches: {
        setIsSizeScreen(ScreenType.DESKTOP);
        break;
      }
      case window.matchMedia(device.laptopL).matches: {
        setIsSizeScreen(ScreenType.LAPTOPL);
        break;
      }
      case window.matchMedia(device.laptopM).matches: {
        setIsSizeScreen(ScreenType.LAPTOPM);
        break;
      }
      case window.matchMedia(device.laptop).matches: {
        setIsSizeScreen(ScreenType.LAPTOP);
        break;
      }
      case window.matchMedia(device.tablet).matches: {
        setIsSizeScreen(ScreenType.TABLET);
        break;
      }
      default: {
        setIsSizeScreen(ScreenType.PHONE);
      }
    }
  }, []);

  return isSizeScreen;
};

export default useSizeScreen;

"use client";

import { useLocale as useNextIntlLocale } from "next-intl";

export const useLocale = () => {
  return useNextIntlLocale();
};

import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    locale = "en";
  }
  return {
    messages: (await import(`./src/i18n/locales/${locale}.json`)).default,
    locale: locale as string,
  };
});

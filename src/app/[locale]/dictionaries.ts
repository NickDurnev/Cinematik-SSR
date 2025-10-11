import "server-only";

const dictionaries = {
  en: (page: string) =>
    import("../../locales/en.json").then(
      module => (module.default as Record<string, unknown>)[page],
    ),
  ua: (page: string) =>
    import("../../locales/ua.json").then(
      module => (module.default as Record<string, unknown>)[page],
    ),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale, pages: string[]) => {
  let dicts: Record<string, unknown> = {};
  for (const page of pages) {
    const dict = await dictionaries[locale](page);
    dicts = {
      ...dicts,
      ...(typeof dict === "object" && dict !== null ? dict : {}),
    };
  }

  return dicts;
};

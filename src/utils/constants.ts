export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

export const IMDB_BASE_URL = "https://api.themoviedb.org/3/";
export const IMDB_API_KEY = process.env.NEXT_PUBLIC_IMDB_API_KEY;

export const REFRESH_EXPIRATION_DAYS = 604800 / 3600 / 24; // 1 week

export const ACCESS_EXPIRATION_MINUTES = 3600 / 60; // 1 hour

export const DEFAULT_USER = {
  id: "",
  email: "",
  name: "",
  picture: "",
  is_left_review: false,
};

export const DEFAULT_FORM_DATA = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
};

export const DEFAULT_CONTENT_FILTERS = {
  selectedGenres: [],
  selectedSort: null,
  startDate: null,
  endDate: null,
};

export const BASE_CARD_CLASSES = "mx-auto block w-[310px]";
export const TABLET_CARD_CLASSES =
  "tablet:grid tablet:w-[640px] tablet:grid-cols-2 tablet:items-stretch tablet:justify-items-center tablet:gap-5 tablet:whitespace-nowrap";
export const RESPONSIVE_CARD_CLASSES =
  "laptopM:w-full laptopM:grid-cols-4 laptopL:grid-cols-5";

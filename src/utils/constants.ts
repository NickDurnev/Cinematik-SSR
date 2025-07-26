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

type ResponseCode = 200 | 201 | 400 | 404 | 500;
export interface IApiResponse<T> {
  data: T;
  code: ResponseCode;
  message: string;
  status: "success" | "error";
}

export interface IPaginatedResponse<T> {
  data: T[];
  status: "success" | "error";
  message: string;
  meta: { total: number; page: number; limit: number; total_pages: number };
}

export interface ImdbPaginatedResponse<T> {
  data: T[];
  next_page: number;
  total_pages: number;
}

export enum ContentType {
  MOVIE = "movie",
  TV = "tv",
}

export enum SearchType {
  MOVIE = "movie",
  TV = "tv",
  PERSON = "person",
}

export enum ScreenType {
  PHONE = "phone",
  TABLET = "tablet",
  LAPTOP = "laptop",
  LAPTOPM = "laptopM",
  LAPTOPL = "laptopL",
  DESKTOP = "desktop",
}

export interface IGenre {
  id: string;
  name: string;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string | null;
}

export interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface IContentData {
  overview: string;
  vote_average: number;
  genre_ids: number[];
  poster_path?: string | null;
}

export interface IBaseMovieData extends IContentData {
  release_date: string;
  title: string;
  tagline: string;
  runtime: number;
  genres: IGenre[];
  budget?: number;
}

export interface IBaseTVShowData extends IContentData {
  adult: boolean;
  backdrop_path: string | null;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: IGenre[];
  homepage: string | null;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode | null;
  name: string;
  next_episode_to_air: Episode | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export type Option = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type DateOption = {
  value: string;
  index: number;
};

export type ContentFilters = {
  selectedGenres: Option[];
  selectedSort: Option | null;
  startDate: DateOption | null;
  endDate: DateOption | null;
};

export interface IReview {
  id: string;
  author: string;
  content: string;
  created_at: string;
  formattedPath: string | null;
  avatar_path: string | null;
  author_details?: { avatar_path: string };
}

export interface ITrailer {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface IActor {
  biography: string;
  profile_path: string;
  name: string;
  birthday: string;
  deathday: string;
  gender: number;
  place_of_birth: string;
  popularity: number;
  id: number;
  cast_id?: string;
  character?: string;
}

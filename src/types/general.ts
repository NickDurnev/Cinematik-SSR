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

interface IContentData {
  overview: string;
  vote_average: number;
  genre_ids: number[];
  poster_path?: string;
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
  first_air_date: string;
  name: string;
  tagline: string;
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

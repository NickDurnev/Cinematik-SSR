import { IBaseMovieData } from "./general";

export enum MovieCategoryType {
  NOW_PLAYING = "now_playing",
  POPULAR = "popular",
  TOP_RATED = "top_rated",
  UPCOMING = "upcoming",
}
export interface IUser {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  leftReview: boolean;
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

export interface IMovie extends IBaseMovieData {
  id: number;
}

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

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

export interface IMovie extends IBaseMovieData {
  id: number;
}

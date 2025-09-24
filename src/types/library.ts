import { IBaseMovieData } from "./general";

export enum CategoryEnum {
  WATCHED = "watched",
  FAVORITES = "favorites",
}

export interface ILibraryMovie extends IBaseMovieData {
  id: string;
  idb_id: string;
  user_id: string;
  category: CategoryEnum;
  created_at: string;
  updated_at: string;
}

export interface IAddToLibraryMovieDto extends IBaseMovieData {
  category: CategoryEnum;
}

export interface ILibraryMoviePartial
  extends Pick<ILibraryMovie, "id" | "idb_id" | "category"> {}

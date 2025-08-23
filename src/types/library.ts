import { IBaseMovieData } from "./movie";

export type ICategory = "favorites" | "watched";

export interface ILibraryMovie extends IBaseMovieData {
  id: string;
  idb_id: string;
  user_id: string;
  category: ICategory;
  created_at: string;
  updated_at: string;
}

export interface IAddToLibraryMovieDto extends IBaseMovieData {
  category: ICategory;
}

export interface ILibraryMoviePartial
  extends Pick<ILibraryMovie, "id" | "idb_id" | "category"> {}

import { IBaseTVShowData } from "./general";

export interface ITVShow extends IBaseTVShowData {
  id: number;
}

export enum TVShowCategoryType {
  AIRING_TODAY = "airing_today",
  ON_THE_AIR = "on_the_air",
  TOP_RATED = "top_rated",
  POPULAR = "popular",
}

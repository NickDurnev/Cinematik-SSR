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

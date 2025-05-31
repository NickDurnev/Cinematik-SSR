type ResponseCode = 200 | 201 | 400 | 404 | 500;

export interface IApiResponse<T> {
  data: T;
  code: ResponseCode;
  message: string;
  status: "success" | "error";
}

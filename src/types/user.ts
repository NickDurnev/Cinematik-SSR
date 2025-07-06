export interface IAuthCredentialsDto {
  email: string;
  password: string;
  name: string;
}

export type ILoginCredentialsDto = Pick<
  IAuthCredentialsDto,
  "email" | "password"
>;

export interface ITokensData {
  access_token: string;
  refresh_token: string;
  access_token_expires: number;
  refresh_token_expires: number;
}

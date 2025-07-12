export interface IAuthCredentialsDto {
  email: string;
  password: string;
  name: string;
}

export type ILoginCredentialsDto = Pick<
  IAuthCredentialsDto,
  "email" | "password"
>;

export type ISocialLoginDto = Pick<IAuthCredentialsDto, "name" | "email"> & {
  picture: string;
};

export interface INextAuthUserData {
  email: string;
  name: string;
  picture: string;
  locale?: string;
}

export interface IAuthData {
  user: IUser;
  tokens: ITokensData;
}

export interface ITokensData {
  access_token: string;
  refresh_token: string;
  access_token_expires: number;
  refresh_token_expires: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  picture: string;
  is_left_review: boolean;
}

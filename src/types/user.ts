export interface IAuthData {
  checkSession: () => Promise<void>;
  error?: Error;
  isLoading: boolean;
  user: IAuthUserData;
}

export interface IAuthUserData {
  email: string;
  name: string;
  picture: string;
  locale?: string;
}

export interface IUser extends IAuthUserData {
  _id: string;
  leftReview: boolean;
}

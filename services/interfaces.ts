export interface IAuthData {
  checkSession: () => Promise<void>;
  error?: Error;
  isLoading: boolean;
  user?: IUser;
}

export interface IUser {
  email?: string | null;
  locale?: string | null;
  name?: string | null;
  picture?: string | null;
  _id?: string;
  leftReview?: boolean;
}

export interface IReview {
  _id?: string;
  createdAt?: string | null;
  name?: string | null;
  rating?: string;
  picture?: string | null;
  text: string;
}

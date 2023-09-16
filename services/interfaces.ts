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
  createdAt: string;
  name: string;
  rating?: string;
  picture?: string;
  text: string;
}

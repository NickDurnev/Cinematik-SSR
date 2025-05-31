export interface IReview {
  _id?: string;
  createdAt?: string | null;
  name?: string | null;
  rating?: string;
  picture?: string | null;
  text: string;
}

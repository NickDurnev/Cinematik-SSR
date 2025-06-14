export interface IReviewData {
  name: string;
  rating: string;
  picture: string;
  text: string;
}

export interface IReview extends IReviewData {
  _id: string;
  createdAt: string;
}

export interface IReviewData {
  rating: string;
  text: string;
}

export interface IReview {
  id: string;
  user_id: string;
  text: string;
  rating: string;
  created_at: Date;
  updated_at: Date;
}

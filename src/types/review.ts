export interface IReviewData {
  rating: string;
  text: string;
}

export interface IReview {
  id: string;
  user_id: string;
  text: string;
  rating: string;
  created_at: string;
  updated_at: string;
  name: string;
  picture: string;
}

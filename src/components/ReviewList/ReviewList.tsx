"use client";
import { Review } from "@/components";
import { IReview } from "@/types/review";

import { List } from "./ReviewList.styled";

const ReviewList = ({ reviews }: { reviews: IReview[] }) => {
  if (!reviews) {
    return null;
  }

  return (
    <List>
      {reviews.map(review => (
        <Review review={review} key={review._id} />
      ))}
    </List>
  );
};

export default ReviewList;

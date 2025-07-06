"use client";
import { Review } from "@/components";
import { IReview } from "@/types/review";

const ReviewList = ({ reviews }: { reviews: IReview[] }) => {
  if (!reviews) {
    return null;
  }

  return (
    <ul className="mx-auto laptopL:w-[900px] laptopM:w-[685px] tablet:w-[500px] laptop:space-y-[80px] space-y-[55px]">
      {reviews.map(review => (
        <Review review={review} key={review._id} />
      ))}
    </ul>
  );
};

export default ReviewList;

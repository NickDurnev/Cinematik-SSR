"use client";

import { toast } from "react-toastify";

import { AddReviewForm, Show } from "@/components";
import { UserStore, useUserStore } from "@/hooks/stores";
import { useAddReview } from "@/services/review/query-hooks";
import { IReviewFormSchema } from "@/services/review/schemas";

const Reviews = () => {
  const { user, setUser } = useUserStore((state: UserStore) => state);

  const { mutate: addReview, isPending: isReviewPending } = useAddReview();

  const handleSubmit = (review: IReviewFormSchema): void => {
    console.log("🚀 ~ handleSubmit ~ review:", review);
    addReview(review, {
      onSuccess: () => {
        // setReviews([...reviews, response.data]);
        setUser({ ...user, is_left_review: true });
      },
      onError: error => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <section className="laptopM:flex w-full laptopM:items-start laptopM:justify-between laptopL:py-[80px] laptopM:py-[60px] py-[55px]">
      <h2 className="laptopM:mb-0 mb-[60px] font-technovier laptopM:text-[50px] text-[35px] text-mainText uppercase laptopM:leading-[59px] leading-[41px] tracking-wider">
        Reviews
      </h2>
      <Show when={user.id && !user.is_left_review}>
        <AddReviewForm onSubmit={handleSubmit} isLoading={isReviewPending} />
      </Show>
      {/* <ReviewList reviews={reviews} /> */}
    </section>
  );
};

export default Reviews;

"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";

import { QueryTrigger, Show, Spinner } from "@/components/common";
import { AddReviewForm, Review } from "@/components/landing";
import { UserStore, useUserStore } from "@/hooks/stores";
import {
  useAddReview,
  useDeleteReview,
  useReviews,
  useUpdateReview,
} from "@/services/review/query-hooks";
import { IReviewFormSchema } from "@/services/review/schemas";
import { IReview } from "@/types/review";

const Reviews = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [isReviewUpdateFormOpen, setIsReviewUpdateFormOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const { user, setUser } = useUserStore((state: UserStore) => state);

  const { mutate: addReview, isPending: isReviewPending } = useAddReview();

  const { mutate: deleteReview, isPending: isDeletePending } =
    useDeleteReview();

  const { mutate: updateReview, isPending: isUpdatePending } =
    useUpdateReview();

  const { ref: ListRef, inView } = useInView({
    threshold: 0.1,
  });

  const {
    data: reviewsData,
    isPending,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReviews();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    if (isSuccess || reviewsData?.pages?.length) {
      setHasLoaded(true);
      const allReviews = reviewsData.pages.flatMap(page => page.data);
      setReviews(allReviews);
    }
  }, [isSuccess, reviewsData?.pages, hasNextPage]);

  const handleSubmit = (review: IReviewFormSchema): void => {
    addReview(review, {
      onSuccess: ({ data: newReview }) => {
        setUser({ ...user, is_left_review: true });
        setReviews(prev => [
          { ...newReview, name: user.name, picture: user.picture },
          ...prev,
        ]);
      },
      onError: error => {
        toast.error(error?.message);
      },
    });
  };

  const handleDelete = (): void => {
    deleteReview(undefined, {
      onSuccess: () => {
        toast("Review deleted successfully");
        setUser({ ...user, is_left_review: false });
        setReviews(prev => prev.filter(review => review.user_id !== user.id));
      },
      onError: error => {
        toast.error(error?.message);
      },
    });
  };

  const handleUpdate = (review: IReviewFormSchema): void => {
    updateReview(review, {
      onSuccess: updatedReview => {
        setReviews(prev => {
          return prev.map(review => {
            if (review.user_id === user.id) {
              return {
                ...updatedReview.data,
                name: user.name,
                picture: user.picture,
              };
            }
            return review;
          });
        });
        setIsReviewUpdateFormOpen(false);
      },
      onError: error => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <section className="flex w-full flex-col laptopM:items-start laptopM:justify-between gap-y-16 laptopL:py-[80px] laptopM:py-[60px] py-[55px]">
      <h2 className="font-technovier laptopM:text-[50px] text-[35px] text-mainText uppercase laptopM:leading-[59px] leading-[41px] tracking-wider">
        Reviews
      </h2>
      <Show when={user.id && (!user.is_left_review || isReviewUpdateFormOpen)}>
        <AddReviewForm
          onSubmit={isReviewUpdateFormOpen ? handleUpdate : handleSubmit}
          isLoading={isUpdatePending || isReviewPending}
          reviewToUpdate={reviews.find(review => review.user_id === user.id)}
        />
      </Show>
      <Show
        when={hasLoaded && reviews.length !== 0}
        fallback={
          <div className="m-0 mx-auto laptopL:mb-[115px] laptopM:mb-[100px] mb-20 flex w-full laptopL:max-w-[900px] laptopM:max-w-[685px] flex-col gap-3 rounded-2xl text-center">
            <h2 className="font-technovier text-[35px] text-mainText uppercase leading-[41px] tracking-wider">
              No reviews yet
            </h2>
            <p className="text-main">Be the first to leave a review</p>
          </div>
        }
      >
        <ul className="mx-auto w-full max-w-[600px] laptop:space-y-[80px] space-y-[55px]">
          {reviews.map(review => (
            <Review
              review={review}
              key={review.id}
              handleDelete={handleDelete}
              handleUpdate={() => setIsReviewUpdateFormOpen(true)}
              isDeletePending={isDeletePending}
              isUpdatePending={isUpdatePending}
            />
          ))}
          {hasNextPage && <QueryTrigger ref={ListRef} />}
        </ul>
      </Show>
      {(isPending || isFetchingNextPage) && (
        <div className="py-6">
          <Spinner />
        </div>
      )}
    </section>
  );
};

export default Reviews;

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";

import { QueryTrigger, Show, Spinner } from "@/components/common";
import { useMovieReviews } from "@/services/movies/query-hooks";
import { IReview } from "@/types/movie";

import { Notify } from "./Notify";
import { ReviewCard } from "./ReviewCard";

const ReviewList = ({ movieId }: { movieId: string }) => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  const [hasLoaded, setHasLoaded] = useState(false);

  const {
    data: reviewsData,
    isPending,
    isError,
    error,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMovieReviews({ movieId });

  const { ref: ListRef, inView } = useInView({
    threshold: 0.1,
  });

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

  if (isError) {
    return toast.error(error?.message);
  }

  return (
    <>
      <Show
        when={hasLoaded && reviews.length !== 0}
        fallback={
          <Notify>
            <h2>We don't have any reviews for this movie</h2>
            <SentimentVeryDissatisfiedIcon sx={{ fontSize: 70, mt: 1 }} />
          </Notify>
        }
      >
        <ul className="mx-auto laptopL:w-[900px] laptopM:w-[685px] tablet:w-[500px] py-10">
          {reviews.map(
            ({ author, content, created_at, id, author_details }: IReview) => {
              let avatar_path = null;
              let formattedPath = null;
              if (author_details?.avatar_path) {
                avatar_path = author_details?.avatar_path;
                formattedPath = avatar_path.replace("/", "");
              }
              return (
                <li
                  key={id}
                  className="[&:not(:first-child)]:mt-[55px] laptop:[&:not(:first-child)]:mt-20"
                >
                  <ReviewCard
                    data={{
                      id,
                      formattedPath,
                      avatar_path,
                      author,
                      content,
                      created_at,
                    }}
                  />
                </li>
              );
            },
          )}
          {hasNextPage && <QueryTrigger ref={ListRef} />}
        </ul>
      </Show>
      <Show when={isPending || isFetchingNextPage}>
        <div className="py-6">
          <Spinner />
        </div>
      </Show>
    </>
  );
};

export default ReviewList;

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { CardSkeleton, Show } from "@/components/common";
import { useSimilarMovies } from "@/services/movies/query-hooks";
import { IMovie } from "@/types/movie";

import { Notify } from "../Notify";
import { Swiper } from "../Swiper";

export const SimilarMovies = ({ movieId }: { movieId: string }) => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const [hasLoaded, setHasLoaded] = useState(false);

  const {
    data: moviesData,
    isError,
    isPending,
    error,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSimilarMovies({ movieId });

  useEffect(() => {
    if (isSuccess || moviesData?.pages?.length) {
      setHasLoaded(true);
      const allMovies = moviesData.pages.flatMap(page => page.data);
      setMovies(allMovies);
    }
  }, [isSuccess, moviesData?.pages]);

  if (isError) {
    return toast.error(error?.message);
  }

  return (
    <>
      <Show
        when={hasLoaded && movies.length !== 0}
        fallback={
          <Notify>
            <h2>We don't have similar movies for this movie</h2>
            <SentimentVeryDissatisfiedIcon sx={{ fontSize: 70, mt: 1 }} />
          </Notify>
        }
      >
        <Swiper
          movies={movies}
          onAutoPlay
          onReachEnd={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Show>
      <Show when={isPending}>
        <CardSkeleton />
      </Show>
    </>
  );
};

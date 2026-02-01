import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { CustomLink, Show, SwiperSkeleton } from "@/components/common";
import { useCategoryMovies } from "@/services/movies/query-hooks";
import { IMovie, MovieCategoryType } from "@/types/movie";

import { Swiper } from "../Swiper";

interface IProps {
  category: MovieCategoryType;
  title: string;
}

export const TopCategoryMovies = ({ category, title }: IProps) => {
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
  } = useCategoryMovies({ category });

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
    <div className="home-content-container swiper-container">
      <CustomLink href={`/movies/${category}`} className="home-content-title">
        {title}
      </CustomLink>
      <Show when={hasLoaded && movies.length !== 0}>
        <Swiper
          data={movies}
          onReachEnd={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Show>
      <Show when={isPending}>
        <SwiperSkeleton />
      </Show>
    </div>
  );
};

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { CustomLink, Show, SwiperSkeleton } from "@/components/common";
import { useTrendMovies } from "@/services/movies/query-hooks";
import { IMovie } from "@/types/movie";

import { Swiper } from "../Swiper";

export const TrendMovies = () => {
  const t = useTranslations("app.categories");
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
  } = useTrendMovies();

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
      <CustomLink href={"/movies/trending"} className="home-content-title">
        {t("trendMovies")}
      </CustomLink>
      <Show when={hasLoaded && movies.length !== 0}>
        <Swiper
          data={movies}
          onReachEnd={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onAutoPlay
        />
      </Show>
      <Show when={isPending}>
        <SwiperSkeleton />
      </Show>
    </div>
  );
};

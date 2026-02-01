"use client";

import { useTranslations } from "next-intl";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";

import { ContentCard } from "@/components/app";
import { TopCategoryMovies, TrendMovies } from "@/components/app/movies";
import { TopCategoryTVShows, TrendTVShows } from "@/components/app/tv-shows";
import {
  AnimatedPage,
  CustomLink,
  GallerySkeleton,
  QueryTrigger,
  Show,
} from "@/components/common";
import {
  useContentFilters,
  useContentType,
  useSearchValue,
} from "@/hooks/stores";
import { useFilteredContent } from "@/hooks/useFilteredContent";
import { ContentType } from "@/types/general";
import { MovieCategoryType } from "@/types/movie";
import { TVShowCategoryType } from "@/types/tv-show";

const HomePage = () => {
  const t = useTranslations("app.categories");
  const contentValue = useContentType();
  const searchValue = useSearchValue();
  const contentFilters = useContentFilters();

  const isMovieContent = contentValue === ContentType.MOVIE;
  const isTVShowContent = contentValue === ContentType.TV;

  const { ref: ListRef, inView } = useInView({
    threshold: 0.1,
  });

  const {
    data,
    isError,
    error,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFilteredContent({
    contentType: contentValue,
    searchValue,
    filters: contentFilters,
  });

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage?.();
  }

  if (isError) {
    return toast.error(error?.message);
  }

  if (isPending) {
    return (
      <AnimatedPage>
        <GallerySkeleton />
      </AnimatedPage>
    );
  }

  if (data.length) {
    return (
      <AnimatedPage>
        <ul className="gallery-container">
          {data.map(item => {
            const isMovie = "title" in item;

            return (
              <li key={item.id}>
                <CustomLink
                  href={`/${isMovie ? "movies" : "tv-shows"}/${item.id}`}
                >
                  <ContentCard data={item} />
                </CustomLink>
              </li>
            );
          })}
        </ul>

        {hasNextPage && <QueryTrigger ref={ListRef} />}
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      <Show when={isMovieContent}>
        <TopCategoryMovies
          category={MovieCategoryType.UPCOMING}
          title={t("upcomingMovies")}
        />
        <TrendMovies />
        <TopCategoryMovies
          category={MovieCategoryType.TOP_RATED}
          title={t("topRatedMovies")}
        />
      </Show>
      <Show when={isTVShowContent}>
        <TopCategoryTVShows
          category={TVShowCategoryType.ON_THE_AIR}
          title={t("onTheAirTVShows")}
        />
        <TrendTVShows />
        <TopCategoryTVShows
          category={TVShowCategoryType.TOP_RATED}
          title={t("topRatedTVShows")}
        />
      </Show>
    </AnimatedPage>
  );
};

export default HomePage;

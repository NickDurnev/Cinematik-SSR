"use client";

import { useEffect, useState } from "react";
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
import { useContentType, useSearchValue } from "@/hooks/stores";
import { useSearchMovies } from "@/services/movies/query-hooks";
import { useSearchTVShows } from "@/services/tv-shows/query-hooks";
import { ContentType } from "@/types/general";
import { IMovie, MovieCategoryType } from "@/types/movie";
import { ITVShow, TVShowCategoryType } from "@/types/tv-show";

const HomePage = () => {
  const [data, setData] = useState<(IMovie | ITVShow)[]>([]);
  const contentValue = useContentType();
  const searchValue = useSearchValue();

  const isMovieContent = contentValue === ContentType.MOVIE;
  const isTVShowContent = contentValue === ContentType.TV;

  const { ref: ListRef, inView } = useInView({
    threshold: 0.1,
  });

  const {
    data: searchMovies,
    isError: isErrorMovies,
    isPending: isPendingMovies,
    error: errorMovies,
    fetchNextPage: fetchNextPageMovies,
    hasNextPage: hasNextPageMovies,
    isFetchingNextPage: isFetchingNextPageMovies,
  } = useSearchMovies({
    query: searchValue,
    enabled: searchValue !== "" && isMovieContent,
  });
  const {
    data: searchTVShows,
    isError: isErrorTVShows,
    isPending: isPendingTVShows,
    error: errorTVShows,
    fetchNextPage: fetchNextPageTVShows,
    hasNextPage: hasNextPageTVShows,
    isFetchingNextPage: isFetchingNextPageTVShows,
  } = useSearchTVShows({
    query: searchValue,
    enabled: searchValue !== "" && isTVShowContent,
  });

  // Consolidated derived state depending on selected content type
  const activeSearch = isMovieContent ? searchMovies : searchTVShows;
  const isError = isMovieContent ? isErrorMovies : isErrorTVShows;
  const activeError = isMovieContent ? errorMovies : errorTVShows;
  const isPending =
    (isMovieContent ? isPendingMovies : isPendingTVShows) &&
    Boolean(searchValue);
  const fetchNextPage = isMovieContent
    ? fetchNextPageMovies
    : fetchNextPageTVShows;
  const hasNextPage = isMovieContent ? hasNextPageMovies : hasNextPageTVShows;
  const isFetchingNextPage = isMovieContent
    ? isFetchingNextPageMovies
    : isFetchingNextPageTVShows;

  // Aggregate pages into a single flat list when results change
  useEffect(() => {
    if (activeSearch?.pages?.length) {
      const combined = activeSearch.pages.flatMap(
        page => page.data as (IMovie | ITVShow)[],
      );
      setData(combined);
    }
  }, [activeSearch?.pages]);

  // Notify when search has no results
  useEffect(() => {
    if (!searchValue) {
      return;
    }
    const pages = activeSearch?.pages;
    if (!pages?.length) {
      return;
    }
    const total = pages.reduce((sum, page) => sum + page.data.length, 0);
    if (total === 0) {
      toast.info("Nothing found");
    }
  }, [activeSearch?.pages, searchValue]);

  useEffect(() => {
    if (!inView) {
      return;
    }
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (!searchValue) {
      setData([]);
    }
  }, [searchValue]);

  if (isError) {
    return toast.error(activeError?.message);
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
          title={"Upcoming movies"}
        />
        <TrendMovies />
        <TopCategoryMovies
          category={MovieCategoryType.TOP_RATED}
          title={"Top rated movies"}
        />
      </Show>
      <Show when={isTVShowContent}>
        <TopCategoryTVShows
          category={TVShowCategoryType.ON_THE_AIR}
          title={"On the air tv shows"}
        />
        <TrendTVShows />
        <TopCategoryTVShows
          category={TVShowCategoryType.TOP_RATED}
          title={"Top rated tv shows"}
        />
      </Show>
    </AnimatedPage>
  );
};

export default HomePage;

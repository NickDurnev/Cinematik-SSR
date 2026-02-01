// hooks/useFilteredContent.ts

import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useIsChangedPage, useIsChangedPageSetter } from "@/hooks/stores";
import {
  useFilteredMovies,
  useSearchMovies,
} from "@/services/movies/query-hooks";
import {
  useSearchTVShows,
  //   useFilteredTVShows,
} from "@/services/tv-shows/query-hooks";
import {
  ContentFilters,
  ContentType,
  ImdbPaginatedResponse,
} from "@/types/general";
import { IMovie } from "@/types/movie";
import { ITVShow } from "@/types/tv-show";

interface UseFilteredContentProps {
  contentType: ContentType;
  searchValue: string;
  filters: ContentFilters;
}

export const useFilteredContent = ({
  contentType,
  searchValue,
  filters,
}: UseFilteredContentProps) => {
  const [data, setData] = useState<(IMovie | ITVShow)[]>([]);
  const isChangedPage = useIsChangedPage();
  const setIsChangedPage = useIsChangedPageSetter();

  const isMovieContent = contentType === ContentType.MOVIE;
  const isTVShowContent = contentType === ContentType.TV;
  const isEmptyFilters = !Object.values(filters)
    .map(val => {
      if (Array.isArray(val)) {
        return val.length > 0;
      }
      return val !== null && val !== undefined;
    })
    .some(Boolean);

  // --- Movies queries ---
  const searchMovies = useSearchMovies({
    query: searchValue,
    enabled: !!searchValue && isMovieContent,
  });
  const filteredMovies = useFilteredMovies({
    filters,
    enabled: !isEmptyFilters && isMovieContent,
  });

  // --- TV shows queries ---
  const searchTVShows = useSearchTVShows({
    query: searchValue,
    enabled: !!searchValue && isTVShowContent,
  });
  //   const filteredTVShows = useFilteredTVShows?.({
  //     filters,
  //     enabled: !searchValue && isTVShowContent,
  //   }); // stub for later

  // Pick the right query depending on mode

  let activeQuery: InfiniteQueryObserverResult<
    InfiniteData<ImdbPaginatedResponse<IMovie | ITVShow>>,
    Error
  > | null = null;

  switch (contentType) {
    case ContentType.MOVIE:
      if (searchValue) {
        activeQuery = searchMovies;
      } else if (!isEmptyFilters) {
        activeQuery = filteredMovies;
      }
      break;
    case ContentType.TV:
      if (searchValue) {
        activeQuery = searchTVShows;
      }
      break;
  }

  useEffect(() => {
    if (isChangedPage) {
      activeQuery = searchMovies;
      searchMovies?.refetch?.();
      setIsChangedPage(false);
    }
  }, [isChangedPage, searchMovies, setIsChangedPage, activeQuery]);

  // Flatten infinite query pages
  useEffect(() => {
    if (activeQuery?.data?.pages?.length) {
      const combined = activeQuery.data.pages.flatMap(
        page => page.data as (IMovie | ITVShow)[],
      );
      setData(combined);
    }
  }, [activeQuery?.data]);

  // Toast "nothing found"
  useEffect(() => {
    if (!searchValue) {
      return;
    }
    const pages = activeQuery?.data?.pages;
    if (!pages?.length) {
      return;
    }
    const total = pages.reduce((sum, p) => sum + p.data.length, 0);
    if (total === 0) {
      toast.info("Nothing found");
    }
  }, [activeQuery?.data?.pages, searchValue]);

  // Reset when search cleared
  useEffect(() => {
    if (!searchValue) {
      setData([]);
    }
  }, [searchValue]);

  // Reset when filters cleared
  useEffect(() => {
    if (isEmptyFilters && !activeQuery) {
      setData([]);
    }
  }, [isEmptyFilters, activeQuery]);

  return {
    data,
    refetch: activeQuery?.refetch,
    isError: activeQuery?.isError,
    error: activeQuery?.error,
    isPending: activeQuery?.isPending,
    fetchNextPage: activeQuery?.fetchNextPage,
    hasNextPage: activeQuery?.hasNextPage,
    isFetchingNextPage: activeQuery?.isFetchingNextPage,
  };
};

// hooks/useFilteredContent.ts
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  useFilteredMovies,
  useSearchMovies,
} from "@/services/movies/query-hooks";
import {
  useSearchTVShows,
  //   useFilteredTVShows,
} from "@/services/tv-shows/query-hooks";
import { ContentFilters, ContentType } from "@/types/general";
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
  console.log("🚀 ~ isEmptyFilters:", isEmptyFilters);

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
  let activeQuery;

  switch (contentType) {
    case ContentType.MOVIE:
      if (searchValue) {
        activeQuery = searchMovies;
      } else if (!isEmptyFilters) {
        activeQuery = filteredMovies;
      } else {
        activeQuery = null; // nothing to run
      }
      break;
    case ContentType.TV:
      if (searchValue) {
        activeQuery = searchTVShows;
      } else {
        activeQuery = null; // later: filteredTVShows
      }
      break;
    default:
      activeQuery = null;
  }

  // Flatten infinite query pages
  useEffect(() => {
    if (activeQuery?.data?.pages?.length) {
      const combined = activeQuery.data.pages.flatMap(
        page => page.data as (IMovie | ITVShow)[],
      );
      setData(combined);
    }
  }, [activeQuery?.data?.pages]);

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
    if (isEmptyFilters) {
      setData([]);
    }
  }, [isEmptyFilters]);

  return {
    data,
    isError: activeQuery?.isError,
    error: activeQuery?.error,
    isPending: activeQuery?.isPending,
    fetchNextPage: activeQuery?.fetchNextPage,
    hasNextPage: activeQuery?.hasNextPage,
    isFetchingNextPage: activeQuery?.isFetchingNextPage,
  };
};

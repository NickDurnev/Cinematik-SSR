import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  fetchCategoryTVShows,
  fetchTrendTVShows,
  fetchTVShowGenres,
  fetchTVShowTrailers,
  searchTVShow,
  similarTVShows,
  tvShowCast,
  tvShowDetails,
  tvShowReviews,
  tvShowsByActor,
} from "@/services/tv-shows/service";
import { TVShowCategoryType } from "@/types/tv-show";

export const useTrendTVShows = () =>
  useInfiniteQuery({
    queryKey: ["trend-tv-shows"],
    queryFn: ({ pageParam = 1 }) => fetchTrendTVShows({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.next_page < lastPage.total_pages) {
        return lastPage.next_page;
      }
      return null;
    },
  });

export const useCategoryTVShows = ({
  category,
}: {
  category: TVShowCategoryType;
}) =>
  useInfiniteQuery({
    queryKey: ["category-tv-shows", category],
    queryFn: ({ pageParam = 1 }) =>
      fetchCategoryTVShows({ page: pageParam, category }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.next_page < lastPage.total_pages) {
        return lastPage.next_page;
      }
      return null;
    },
  });

export const useAllTVShowGenres = (enabled: boolean) =>
  useQuery({
    queryKey: ["tv-show-genres"],
    queryFn: () => fetchTVShowGenres(),
    enabled,
  });

export const useSearchTVShows = ({
  query,
  enabled,
}: {
  query: string;
  enabled: boolean;
}) =>
  useInfiniteQuery({
    queryKey: ["search-tv-shows", query],
    queryFn: ({ pageParam = 1 }) => searchTVShow({ page: pageParam, query }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.next_page < lastPage.total_pages) {
        return lastPage.next_page;
      }
      return null;
    },
    enabled,
  });

export const useTVShowCast = ({ tvShowId }: { tvShowId: string }) =>
  useQuery({
    queryKey: ["tv-show-cast", tvShowId],
    queryFn: () => tvShowCast({ tvShowId }),
    enabled: Boolean(tvShowId),
  });

export const useTVShowReviews = ({ tvShowId }: { tvShowId: string }) =>
  useInfiniteQuery({
    queryKey: ["tv-show-reviews", tvShowId],
    queryFn: ({ pageParam = 1 }) =>
      tvShowReviews({ page: pageParam, tvShowId }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.next_page < lastPage.total_pages) {
        return lastPage.next_page;
      }
      return null;
    },
  });

export const useTVShowTrailers = ({ tvShowId }: { tvShowId: string }) =>
  useQuery({
    queryKey: ["tv-show-trailers", tvShowId],
    queryFn: () => fetchTVShowTrailers({ tvShowId }),
  });

export const useSimilarTVShows = ({ tvShowId }: { tvShowId: string }) =>
  useInfiniteQuery({
    queryKey: ["similar-tv-shows", tvShowId],
    queryFn: ({ pageParam = 1 }) =>
      similarTVShows({ page: pageParam, tvShowId }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.next_page < lastPage.total_pages) {
        return lastPage.next_page;
      }
      return null;
    },
  });

export const useTVShowsByActor = ({ actorId }: { actorId: string }) =>
  useQuery({
    queryKey: ["tv-shows-by-actor", actorId],
    queryFn: () => tvShowsByActor({ actorId }),
  });

export const useTVShowDetails = ({ tvShowId }: { tvShowId: string }) =>
  useQuery({
    queryKey: ["tv-show-details", tvShowId],
    queryFn: () => tvShowDetails({ tvShowId }),
    enabled: Boolean(tvShowId),
  });

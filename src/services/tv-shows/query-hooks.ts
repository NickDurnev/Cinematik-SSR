import { useInfiniteQuery } from "@tanstack/react-query";

import {
  fetchCategoryTVShows,
  fetchTrendTVShows,
} from "@/services/tv-shows/service";
import { TVShowCategoryType } from "@/types/tv-show";

// export const useMovieCast = ({ movieId }: { movieId: string }) =>
//   useQuery({
//     queryKey: ["movie-cast", { movieId }],
//     queryFn: () => movieCast({ movieId }),
//     enabled: Boolean(movieId),
//   });

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

// export const useMovieReviews = ({ movieId }: { movieId: string }) =>
//   useInfiniteQuery({
//     queryKey: ["movie-reviews"],
//     queryFn: ({ pageParam = 1 }) => movieReviews({ page: pageParam, movieId }),
//     initialPageParam: 1,
//     getNextPageParam: lastPage => {
//       if (lastPage.next_page < lastPage.total_pages) {
//         return lastPage.next_page;
//       }
//       return null;
//     },
//   });

// export const useSimilarMovies = ({ movieId }: { movieId: string }) =>
//   useInfiniteQuery({
//     queryKey: ["similar-movies"],
//     queryFn: ({ pageParam = 1 }) => similarMovies({ page: pageParam, movieId }),
//     initialPageParam: 1,
//     getNextPageParam: lastPage => {
//       if (lastPage.next_page < lastPage.total_pages) {
//         return lastPage.next_page;
//       }
//       return null;
//     },
//   });

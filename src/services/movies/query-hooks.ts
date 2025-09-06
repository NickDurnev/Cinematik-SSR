import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  fetchCategoryMovies,
  fetchTrendMovies,
  movieCast,
  movieReviews,
  similarMovies,
} from "@/services/movies/service";

export const useMovieCast = ({ movieId }: { movieId: string }) =>
  useQuery({
    queryKey: ["movie-cast", { movieId }],
    queryFn: () => movieCast({ movieId }),
    enabled: Boolean(movieId),
  });

export const useTrendMovies = () =>
  useQuery({
    queryKey: ["trend-movies"],
    queryFn: () => fetchTrendMovies(),
  });

export const useMovieReviews = ({ movieId }: { movieId: string }) =>
  useInfiniteQuery({
    queryKey: ["movie-reviews"],
    queryFn: ({ pageParam = 1 }) => movieReviews({ page: pageParam, movieId }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.next_page < lastPage.total_pages) {
        return lastPage.next_page;
      }
      return null;
    },
  });

export const useSimilarMovies = ({ movieId }: { movieId: string }) =>
  useInfiniteQuery({
    queryKey: ["similar-movies"],
    queryFn: ({ pageParam = 1 }) => similarMovies({ page: pageParam, movieId }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.next_page < lastPage.total_pages) {
        return lastPage.next_page;
      }
      return null;
    },
  });

export const useCategoryMovies = ({ category }: { category: string }) =>
  useInfiniteQuery({
    queryKey: ["category-movies"],
    queryFn: ({ pageParam = 1 }) =>
      fetchCategoryMovies({ page: pageParam, category }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.next_page < lastPage.total_pages) {
        return lastPage.next_page;
      }
      return null;
    },
  });

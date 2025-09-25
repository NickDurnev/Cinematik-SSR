import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  fetchCategoryMovies,
  fetchMoviesGenres,
  fetchTrendMovies,
  movieCast,
  movieReviews,
  searchMovie,
  similarMovies,
} from "@/services/movies/service";
import { MovieCategoryType } from "@/types/movie";

export const useMovieCast = ({ movieId }: { movieId: string }) =>
  useQuery({
    queryKey: ["movie-cast", { movieId }],
    queryFn: () => movieCast({ movieId }),
    enabled: Boolean(movieId),
  });

export const useTrendMovies = () =>
  useInfiniteQuery({
    queryKey: ["trend-movies"],
    queryFn: ({ pageParam = 1 }) => fetchTrendMovies({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.next_page < lastPage.total_pages) {
        return lastPage.next_page;
      }
      return null;
    },
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

export const useCategoryMovies = ({
  category,
}: {
  category: MovieCategoryType;
}) =>
  useInfiniteQuery({
    queryKey: ["category-movies", category],
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

export const useAllMovieGenres = () =>
  useQuery({
    queryKey: ["movie-genres"],
    queryFn: () => fetchMoviesGenres(),
    staleTime: 25 * (60 * 1000), // 25 mins
    gcTime: 30 * (60 * 1000), // 30 mins
  });

export const useSearchMovies = ({
  query,
  enabled,
}: {
  query: string;
  enabled: boolean;
}) =>
  useInfiniteQuery({
    queryKey: ["search-movies", query],
    queryFn: ({ pageParam = 1 }) => searchMovie({ page: pageParam, query }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.next_page < lastPage.total_pages) {
        return lastPage.next_page;
      }
      return null;
    },
    enabled,
  });

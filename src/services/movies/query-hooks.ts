import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  fetchCategoryMovies,
  fetchFilteredMovies,
  fetchMoviesGenres,
  fetchMovieTrailers,
  fetchTrendMovies,
  movieCast,
  movieDetails,
  movieReviews,
  moviesByActor,
  searchMovie,
  similarMovies,
} from "@/services/movies/service";
import { ContentFilters } from "@/types/general";
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

export const useAllMovieGenres = (enabled: boolean) =>
  useQuery({
    queryKey: ["movie-genres"],
    queryFn: () => fetchMoviesGenres(),
    enabled,
  });

export const useFilteredMovies = ({
  filters,
  enabled,
}: {
  filters: ContentFilters;
  enabled: boolean;
}) =>
  useInfiniteQuery({
    queryKey: ["filtered-movies", filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchFilteredMovies({ page: pageParam, filters }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.next_page < lastPage.total_pages) {
        return lastPage.next_page;
      }
      return null;
    },
    enabled,
  });

export const useSearchMovies = ({
  query,
  enabled,
}: {
  query: string;
  enabled: boolean;
}) =>
  useInfiniteQuery({
    queryKey: ["filtered-movies", query],
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

export const useMovieTrailers = ({ movieId }: { movieId: string }) =>
  useQuery({
    queryKey: ["movie-trailers", { movieId }],
    queryFn: () => fetchMovieTrailers({ movieId }),
  });

export const useMoviesByActor = ({ actorId }: { actorId: string }) =>
  useQuery({
    queryKey: ["movies-by-actor", actorId],
    queryFn: () => moviesByActor({ actorId }),
  });

export const useMovieDetails = ({ movieId }: { movieId: string }) =>
  useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => movieDetails({ movieId }),
    enabled: Boolean(movieId),
  });

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addMovieToLibrary,
  deleteMovieFromLibrary,
  getAllLibraryMovies,
  getLibraryMovies,
  updateLibraryMovie,
} from "@/services/library/service";
import { ICategory } from "@/types/library";

import {
  processAddQueryData,
  processDeleteQueryData,
  processUpdateQueryData,
} from "../query-utils";

export const useLibraryMovies = (category: ICategory) =>
  useInfiniteQuery({
    queryKey: ["library-movies"],
    queryFn: ({ pageParam = 1 }) =>
      getLibraryMovies({ page: pageParam, category }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.meta.page < lastPage.meta.total_pages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });

export const useAllLibraryMovies = () =>
  useQuery({
    queryKey: ["all-library-movies"],
    queryFn: () => getAllLibraryMovies(),
  });

export const useAddMovieToLibrary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-movie-to-library"],
    mutationFn: addMovieToLibrary,
    onSuccess: ({ data }) => {
      processAddQueryData(queryClient, ["library-movies"], data);
      processAddQueryData(queryClient, ["all-library-movies"], data);
    },
  });
};

export const useUpdateLibraryMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-library-movie"],
    mutationFn: updateLibraryMovie,
    onSuccess: ({ data }) => {
      processUpdateQueryData(queryClient, ["library-movies"], data);
      processUpdateQueryData(queryClient, ["all-library-movies"], data);
    },
  });
};

export const useDeleteLibraryMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-library-movie"],
    mutationFn: deleteMovieFromLibrary,
    onSuccess: ({ data }) => {
      processDeleteQueryData(queryClient, ["library-movies"], data);
      processDeleteQueryData(queryClient, ["all-library-movies"], data);
    },
  });
};

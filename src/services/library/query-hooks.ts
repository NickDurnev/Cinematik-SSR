import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addMovieToLibrary,
  deleteMovieFromLibrary,
  getLibraryMovies,
  updateLibraryMovie,
} from "@/services/library/service";
import { ICategory, ILibraryMovie } from "@/types/movie";

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

export const useAddMovieToLibrary = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-movie-to-library"],
    mutationFn: addMovieToLibrary,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(
        ["library-movies"],
        (oldData: { data: ILibraryMovie[] }) => {
          if (!oldData) {
            return { data: [data] };
          }
          return { ...oldData, data: [data, ...oldData.data] };
        },
      );
    },
  });
};

export const useUpdateLibraryMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-library-movie"],
    mutationFn: updateLibraryMovie,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(
        ["library-movies"],
        (oldData: { data: ILibraryMovie[] }) => {
          if (!oldData) {
            return { data: [data] };
          }
          return {
            ...oldData,
            data: [
              data,
              ...oldData.data.filter(review => review.id !== data.id),
            ],
          };
        },
      );
    },
  });
};

export const useDeleteLibraryMovie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-library-movie"],
    mutationFn: deleteMovieFromLibrary,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(
        ["library-movies"],
        (oldData: { data: ILibraryMovie[] }) => {
          if (!oldData) {
            return { data: [] };
          }
          return {
            ...oldData,
            data: oldData.data.filter(review => review.id !== data.id),
          };
        },
      );
    },
  });
};

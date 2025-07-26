import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addReview,
  deleteReview,
  getReviews,
  updateReview,
} from "@/services/review/service";
import { IReview } from "@/types/review";

export const useReviews = () =>
  useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: ({ pageParam = 1 }) => getReviews({ page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      if (lastPage.meta.page < lastPage.meta.total_pages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });

export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-review"],
    mutationFn: addReview,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["reviews"], (oldData: { data: IReview[] }) => {
        if (!oldData) {
          return { data: [data] };
        }
        return { ...oldData, data: [data, ...oldData.data] };
      });
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-review"],
    mutationFn: updateReview,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["reviews"], (oldData: { data: IReview[] }) => {
        if (!oldData) {
          return { data: [data] };
        }
        return {
          ...oldData,
          data: [data, ...oldData.data.filter(review => review.id !== data.id)],
        };
      });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-review"],
    mutationFn: deleteReview,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["reviews"], (oldData: { data: IReview[] }) => {
        if (!oldData) {
          return { data: [] };
        }
        return {
          ...oldData,
          data: oldData.data.filter(review => review.id !== data.id),
        };
      });
    },
  });
};

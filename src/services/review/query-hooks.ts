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

import {
  processAddQueryData,
  processDeleteQueryData,
  processUpdateQueryData,
} from "../query-utils";

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
      processAddQueryData(queryClient, ["reviews"], data);
    },
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-review"],
    mutationFn: updateReview,
    onSuccess: ({ data }) => {
      processUpdateQueryData(queryClient, ["reviews"], data);
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-review"],
    mutationFn: deleteReview,
    onSuccess: ({ data }) => {
      processDeleteQueryData(queryClient, ["reviews"], data);
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addReview,
  deleteReview,
  updateReview,
} from "@/services/review/service";
import { IReview } from "@/types/review";

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

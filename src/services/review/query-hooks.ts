import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addReview } from "@/services/review/service";

export const useAddReview = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-review"],
    mutationFn: addReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

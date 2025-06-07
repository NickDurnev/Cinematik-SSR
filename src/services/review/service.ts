import { axiosInstance } from "@/libs/axios";

import { IReview, IReviewData } from "@/services/review/types";
import { IApiResponse } from "@/types/general";

export const addReview = async (
  review: IReviewData,
): Promise<IApiResponse<IReview>> => {
  try {
    const response = await axiosInstance.post<IApiResponse<IReview>>(
      "api/reviews",
      review,
    );

    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to add review");
  }
};

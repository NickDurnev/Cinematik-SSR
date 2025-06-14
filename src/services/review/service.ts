import { axiosInstance } from "@/libs/axios";

import { IApiResponse } from "@/types/general";
import { IReview, IReviewData } from "@/types/review";

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

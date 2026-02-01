import { apiClient } from "@/libs/axios";
import ErrorHelper from "@/libs/error-helper";
import { IApiResponse, IPaginatedResponse } from "@/types/general";
import { IReview, IReviewData } from "@/types/review";

export const getReviews = async ({
  page,
}: {
  page: number;
}): Promise<IPaginatedResponse<IReview>> => {
  try {
    const response = await apiClient.get<IPaginatedResponse<IReview>>(
      "reviews",
      {
        params: {
          page,
        },
      },
    );

    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get reviews");
  }
};

export const addReview = async (
  review: IReviewData,
): Promise<IApiResponse<IReview>> => {
  try {
    const response = await apiClient.post<IApiResponse<IReview>>(
      "reviews",
      review,
    );

    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to add review");
  }
};

export const updateReview = async (
  review: IReviewData,
): Promise<IApiResponse<IReview>> => {
  try {
    const response = await apiClient.patch<IApiResponse<IReview>>(
      "reviews",
      review,
    );

    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to update review");
  }
};

export const deleteReview = async (): Promise<IApiResponse<IReview>> => {
  try {
    const response = await apiClient.delete<IApiResponse<IReview>>("reviews");

    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to delete review");
  }
};

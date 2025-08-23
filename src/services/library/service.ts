import { apiClient } from "@/libs/axios";
import ErrorHelper from "@/libs/error-helper";
import { IApiResponse, IPaginatedResponse } from "@/types/general";
import {
  IAddToLibraryMovieDto,
  ICategory,
  ILibraryMovie,
  ILibraryMoviePartial,
} from "@/types/library";

export const getLibraryMovies = async ({
  page,
  category,
}: {
  page: number;
  category: ICategory;
}): Promise<IPaginatedResponse<ILibraryMovie>> => {
  try {
    const response = await apiClient.get<IPaginatedResponse<ILibraryMovie>>(
      "movies",
      {
        params: {
          page,
          category,
        },
      },
    );

    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get movies");
  }
};

export const getAllLibraryMovies = async (): Promise<
  IPaginatedResponse<ILibraryMoviePartial[]>
> => {
  try {
    const response =
      await apiClient.get<IPaginatedResponse<ILibraryMoviePartial[]>>(
        "movies/ids",
      );

    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get movies");
  }
};

export const addMovieToLibrary = async (
  addMovieToLibraryDto: IAddToLibraryMovieDto,
): Promise<IApiResponse<ILibraryMovie>> => {
  try {
    const response = await apiClient.post<IApiResponse<ILibraryMovie>>(
      "movies",
      addMovieToLibraryDto,
    );

    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to add movie");
  }
};

export const updateLibraryMovie = async ({
  category,
  movie_id,
}: {
  category: ICategory;
  movie_id: string;
}): Promise<IApiResponse<ILibraryMovie>> => {
  try {
    const response = await apiClient.patch<IApiResponse<ILibraryMovie>>(
      `movies/${movie_id}`,
      {
        category,
      },
    );

    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to update movie");
  }
};

export const deleteMovieFromLibrary = async (): Promise<
  IApiResponse<ILibraryMovie>
> => {
  try {
    const response =
      await apiClient.delete<IApiResponse<ILibraryMovie>>("movies");

    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to delete movie");
  }
};

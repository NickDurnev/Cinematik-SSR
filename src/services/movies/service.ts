import { imdbApiClient } from "@/libs/axios";
import ErrorHelper from "@/libs/error-helper";
import { IApiResponse } from "@/types/general";
import {
  IActor,
  IGenre,
  IMovie,
  ImdbAPIResponse,
  ITrailer,
} from "@/types/movie";
import { IReview } from "@/types/review";

export const fetchTrendMovies = async (): Promise<
  IApiResponse<{ results: IMovie[] }>
> => {
  try {
    const response = await imdbApiClient.get("trending/movie/day");
    return response.data.results;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get trending movies");
  }
};

export const fetchMoviesGenres = async (): Promise<{ genres: IGenre[] }> => {
  try {
    const response = await imdbApiClient.get("genre/movie/list");
    return response.data.genres;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get movies genres");
  }
};

export const fetchMoviesByGenre = async ({
  page,
  genreId,
}: {
  page: number;
  genreId: string;
}): Promise<ImdbAPIResponse<IMovie>> => {
  try {
    const response = await imdbApiClient.get("discover/movie", {
      params: {
        page,
        with_genres: genreId,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get movies by genre");
  }
};

export const fetchCategoryMovies = async ({
  page,
  category,
}: {
  page: number;
  category: string;
}): Promise<ImdbAPIResponse<IMovie>> => {
  try {
    const response = await imdbApiClient.get(`movie/${category}`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get category movies");
  }
};

export const searchMovie = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}): Promise<ImdbAPIResponse<IMovie>> => {
  try {
    const response = await imdbApiClient.get("search/movie", {
      params: {
        page,
        query,
        include_adult: false,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to search movie");
  }
};

export const movieDetails = async ({
  movieId,
}: {
  movieId: string;
}): Promise<IMovie> => {
  try {
    const response = await imdbApiClient.get(`movie/${movieId}`);
    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get movie details");
  }
};

export const similarMovies = async ({
  page,
  movieId,
}: {
  page: number;
  movieId: string;
}): Promise<ImdbAPIResponse<IMovie>> => {
  try {
    const response = await imdbApiClient.get(`movie/${movieId}/similar`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get similar movies");
  }
};

export const actorDetails = async ({
  actorId,
}: {
  actorId: string;
}): Promise<IActor> => {
  try {
    const response = await imdbApiClient.get(`person/${actorId}`);
    const data = await response.data;
    return data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get actor details");
  }
};

export const filmsByActor = async ({
  actorId,
}: {
  actorId: string;
}): Promise<{ cast: IMovie[] }> => {
  try {
    const response = await imdbApiClient.get(`person/${actorId}/movie_credits`);
    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get films by actor");
  }
};

export const movieCast = async ({
  movieId,
}: {
  movieId: string;
}): Promise<{ cast: IActor[] }> => {
  try {
    const response = await imdbApiClient.get(`movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get movie cast");
  }
};

export const movieReviews = async ({
  page,
  movieId,
}: {
  page: number;
  movieId: string;
}): Promise<ImdbAPIResponse<IReview>> => {
  try {
    const response = await imdbApiClient.get(`movie/${movieId}/reviews`, {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get movie reviews");
  }
};

export const fetchMovieTrailers = async ({
  movieId,
}: {
  movieId: string;
}): Promise<ITrailer[]> => {
  try {
    const response = await imdbApiClient.get(`movie/${movieId}/videos`);
    return response.data.results;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get movie trailers");
  }
};

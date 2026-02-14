import { imdbApiClient } from "@/libs/axios";
import ErrorHelper from "@/libs/error-helper";
import {
  ContentFilters,
  IActor,
  IGenre,
  ImdbPaginatedResponse,
  IReview,
  ITrailer,
} from "@/types/general";
import { IMovie, MovieCategoryType } from "@/types/movie";

export const fetchTrendMovies = async ({
  page,
}: {
  page: number;
}): Promise<ImdbPaginatedResponse<IMovie>> => {
  try {
    const response = await imdbApiClient.get("trending/movie/week", {
      params: {
        page,
      },
    });
    return {
      data: response.data.results,
      next_page: page + 1,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get trending movies");
  }
};

export const fetchMoviesGenres = async (): Promise<IGenre[]> => {
  try {
    const response = await imdbApiClient.get("genre/movie/list");
    return response.data.genres;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get movies genres");
  }
};

export const fetchFilteredMovies = async ({
  page,
  filters,
  // genreId,
}: {
  page: number;
  filters: ContentFilters;
  // genreId: string;
}): Promise<ImdbPaginatedResponse<IMovie>> => {
  try {
    const response = await imdbApiClient.get("discover/movie", {
      params: {
        page,
        with_genres: filters.selectedGenres.map(genre => genre.value).join(","),
        sort_by: filters.selectedSort?.value,
        "primary_release_date.gte": filters.startDate?.value,
        "primary_release_date.lte": filters.endDate?.value,
      },
    });
    return {
      data: response.data.results,
      next_page: page + 1,
      total_pages: response.data.total_pages,
    };
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
  category: MovieCategoryType;
}): Promise<ImdbPaginatedResponse<IMovie>> => {
  try {
    const response = await imdbApiClient.get(`movie/${category}`, {
      params: {
        page,
      },
    });
    return {
      data: response.data.results,
      next_page: page + 1,
      total_pages: response.data.total_pages,
    };
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
}): Promise<ImdbPaginatedResponse<IMovie>> => {
  try {
    const response = await imdbApiClient.get("search/movie", {
      params: {
        page,
        query,
      },
    });
    return {
      data: response.data.results,
      next_page: page + 1,
      total_pages: response.data.total_pages,
    };
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
}): Promise<ImdbPaginatedResponse<IMovie>> => {
  try {
    const response = await imdbApiClient.get(`movie/${movieId}/similar`, {
      params: {
        page,
      },
    });
    return {
      data: response.data.results,
      next_page: page + 1,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get similar movies");
  }
};

export const moviesByActor = async ({
  actorId,
}: {
  actorId: string;
}): Promise<IMovie[]> => {
  try {
    const response = await imdbApiClient.get(`person/${actorId}/movie_credits`);
    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get movies by actor");
  }
};

export const movieCast = async ({
  movieId,
}: {
  movieId: string;
}): Promise<IActor[]> => {
  try {
    const response = await imdbApiClient.get(`movie/${movieId}/credits`);
    return response.data.cast;
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
}): Promise<ImdbPaginatedResponse<IReview>> => {
  try {
    const response = await imdbApiClient.get(`movie/${movieId}/reviews`, {
      params: {
        page,
      },
    });
    return {
      data: response.data.results,
      next_page: page + 1,
      total_pages: response.data.total_pages,
    };
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

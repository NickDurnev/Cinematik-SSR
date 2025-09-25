import { imdbApiClient } from "@/libs/axios";
import ErrorHelper from "@/libs/error-helper";
import { IGenre, ImdbPaginatedResponse } from "@/types/general";
import { ITVShow } from "@/types/tv-show";

export const fetchTrendTVShows = async ({
  page,
}: {
  page: number;
}): Promise<ImdbPaginatedResponse<ITVShow>> => {
  try {
    const response = await imdbApiClient.get("trending/tv/week", {
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
    throw new Error(errorMessage ?? "Failed to get trending tv shows");
  }
};

export const fetchCategoryTVShows = async ({
  page,
  category,
}: {
  page: number;
  category: string;
}): Promise<ImdbPaginatedResponse<ITVShow>> => {
  try {
    const response = await imdbApiClient.get(`tv/${category}`, {
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

export const fetchTVShowGenres = async (): Promise<IGenre[]> => {
  try {
    const response = await imdbApiClient.get("genre/tv/list");
    return response.data.genres;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get tv show genres");
  }
};

export const searchTVShow = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}): Promise<ImdbPaginatedResponse<ITVShow>> => {
  try {
    const response = await imdbApiClient.get("search/tv", {
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

// export const fetchMoviesByGenre = async ({
//   page,
//   genreId,
// }: {
//   page: number;
//   genreId: string;
// }): Promise<ImdbPaginatedResponse<IMovie>> => {
//   try {
//     const response = await imdbApiClient.get("discover/movie", {
//       params: {
//         page,
//         with_genres: genreId,
//       },
//     });
//     return {
//       data: response.data.results,
//       next_page: page + 1,
//       total_pages: response.data.total_pages,
//     };
//   } catch (error) {
//     const errorMessage = ErrorHelper.getMessage(error);
//     throw new Error(errorMessage ?? "Failed to get movies by genre");
//   }
// };

// export const movieDetails = async ({
//   movieId,
// }: {
//   movieId: string;
// }): Promise<IMovie> => {
//   try {
//     const response = await imdbApiClient.get(`movie/${movieId}`);
//     return response.data;
//   } catch (error) {
//     const errorMessage = ErrorHelper.getMessage(error);
//     throw new Error(errorMessage ?? "Failed to get movie details");
//   }
// };

// export const similarMovies = async ({
//   page,
//   movieId,
// }: {
//   page: number;
//   movieId: string;
// }): Promise<ImdbPaginatedResponse<IMovie>> => {
//   try {
//     const response = await imdbApiClient.get(`movie/${movieId}/similar`, {
//       params: {
//         page,
//       },
//     });
//     return {
//       data: response.data.results,
//       next_page: page + 1,
//       total_pages: response.data.total_pages,
//     };
//   } catch (error) {
//     const errorMessage = ErrorHelper.getMessage(error);
//     throw new Error(errorMessage ?? "Failed to get similar movies");
//   }
// };

// export const actorDetails = async ({
//   actorId,
// }: {
//   actorId: string;
// }): Promise<IActor> => {
//   try {
//     const response = await imdbApiClient.get(`person/${actorId}`);
//     const data = await response.data;
//     return data;
//   } catch (error) {
//     const errorMessage = ErrorHelper.getMessage(error);
//     throw new Error(errorMessage ?? "Failed to get actor details");
//   }
// };

// export const filmsByActor = async ({
//   actorId,
// }: {
//   actorId: string;
// }): Promise<IMovie[]> => {
//   try {
//     const response = await imdbApiClient.get(`person/${actorId}/movie_credits`);
//     return response.data;
//   } catch (error) {
//     const errorMessage = ErrorHelper.getMessage(error);
//     throw new Error(errorMessage ?? "Failed to get films by actor");
//   }
// };

// export const movieCast = async ({
//   movieId,
// }: {
//   movieId: string;
// }): Promise<IActor[]> => {
//   try {
//     const response = await imdbApiClient.get(`movie/${movieId}/credits`);
//     return response.data.cast;
//   } catch (error) {
//     const errorMessage = ErrorHelper.getMessage(error);
//     throw new Error(errorMessage ?? "Failed to get movie cast");
//   }
// };

// export const movieReviews = async ({
//   page,
//   movieId,
// }: {
//   page: number;
//   movieId: string;
// }): Promise<ImdbPaginatedResponse<IReview>> => {
//   try {
//     const response = await imdbApiClient.get(`movie/${movieId}/reviews`, {
//       params: {
//         page,
//       },
//     });
//     return {
//       data: response.data.results,
//       next_page: page + 1,
//       total_pages: response.data.total_pages,
//     };
//   } catch (error) {
//     const errorMessage = ErrorHelper.getMessage(error);
//     throw new Error(errorMessage ?? "Failed to get movie reviews");
//   }
// };

// export const fetchMovieTrailers = async ({
//   movieId,
// }: {
//   movieId: string;
// }): Promise<ITrailer[]> => {
//   try {
//     const response = await imdbApiClient.get(`movie/${movieId}/videos`);
//     return response.data.results;
//   } catch (error) {
//     const errorMessage = ErrorHelper.getMessage(error);
//     throw new Error(errorMessage ?? "Failed to get movie trailers");
//   }
// };

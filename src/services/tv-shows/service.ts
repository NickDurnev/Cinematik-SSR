import { imdbApiClient } from "@/libs/axios";
import ErrorHelper from "@/libs/error-helper";
import {
  IActor,
  IGenre,
  ImdbPaginatedResponse,
  IReview,
  ITrailer,
} from "@/types/general";
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

export const tvShowDetails = async ({
  tvShowId,
}: {
  tvShowId: string;
}): Promise<ITVShow> => {
  try {
    const response = await imdbApiClient.get(`tv/${tvShowId}`);
    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get tv show details");
  }
};

export const similarTVShows = async ({
  page,
  tvShowId,
}: {
  page: number;
  tvShowId: string;
}): Promise<ImdbPaginatedResponse<ITVShow>> => {
  try {
    const response = await imdbApiClient.get(`tv/${tvShowId}/similar`, {
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
    throw new Error(errorMessage ?? "Failed to get similar tv shows");
  }
};

export const tvShowsByActor = async ({
  actorId,
}: {
  actorId: string;
}): Promise<ITVShow[]> => {
  try {
    const response = await imdbApiClient.get(`person/${actorId}/tv_credits`);
    return response.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get tv shows by actor");
  }
};

export const tvShowCast = async ({
  tvShowId,
}: {
  tvShowId: string;
}): Promise<IActor[]> => {
  try {
    const response = await imdbApiClient.get(`tv/${tvShowId}/credits`);
    return response.data.cast;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get tv show cast");
  }
};

export const tvShowReviews = async ({
  page,
  tvShowId,
}: {
  page: number;
  tvShowId: string;
}): Promise<ImdbPaginatedResponse<IReview>> => {
  try {
    const response = await imdbApiClient.get(`tv/${tvShowId}/reviews`, {
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
    throw new Error(errorMessage ?? "Failed to get tv show reviews");
  }
};

export const fetchTVShowTrailers = async ({
  tvShowId,
}: {
  tvShowId: string;
}): Promise<ITrailer[]> => {
  try {
    const response = await imdbApiClient.get(`tv/${tvShowId}/videos`);
    return response.data.results;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get tv show trailers");
  }
};

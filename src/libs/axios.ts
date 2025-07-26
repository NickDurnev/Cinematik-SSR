import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { API_BASE_URL, IMDB_API_KEY, IMDB_BASE_URL } from "@/utils/constants";
import { clearAuthTokens, getCookie, setAccessToken } from "@/utils/cookies";

// IMDB axios instance with base URL
export const imdbApiClient: AxiosInstance = axios.create({
  baseURL: IMDB_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    api_key: IMDB_API_KEY,
    language: "en-US",
  },
});

// Base axios instance with base URL
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach tokens from cookies
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Get access token from cookie
    const accessToken = await getCookie("accessToken");

    // If token exists, add it to the header
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // Get refresh token from cookie (if needed for specific endpoints)
    const refreshToken = await getCookie("refreshToken");
    if (refreshToken) {
      config.headers["X-Refresh-Token"] = refreshToken;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Add response interceptor for token refresh handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Check if error is due to expired token (401) and request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get refresh token from cookies
        const refreshToken = await getCookie("refreshToken");

        if (!refreshToken) {
          // Instead of redirecting here, throw an error
          return error.response;
        }

        // Call refresh token endpoint
        const response = await axios.post(
          `${apiClient.defaults.baseURL}/auth/refresh`,
          {
            refresh_token: refreshToken,
          },
        );

        // Extract new tokens from response
        const { access_token } = response.data.data;

        setAccessToken(access_token);

        // Update Authorization header
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        // Retry the original request with new token
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh token is invalid or expired, clear cookies and reject
        clearAuthTokens();
        return refreshError;
      }
    }

    // Return original error for other cases
    return Promise.reject(error);
  },
);

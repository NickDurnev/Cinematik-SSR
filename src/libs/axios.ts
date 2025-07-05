import axios from "axios";

import { API_BASE_URL, APP_BASE_URL } from "@/utils/constants";

export const axiosInstance = axios.create({
  baseURL: `${APP_BASE_URL}`,
});

export const authAxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/oauth2`,
});

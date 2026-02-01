import {
  ACCESS_EXPIRATION_MINUTES,
  REFRESH_EXPIRATION_DAYS,
} from "@/utils/constants";

const IS_SERVER = typeof window === "undefined";

// Function to get cookies by name
export const getCookie = async (name: string): Promise<string | undefined> => {
  if (IS_SERVER) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get(name); // Use get method to retrieve cookie value
    return cookieValue ? cookieValue.value : undefined; // Return the value if it exists
  } else {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
  }

  return undefined;
};

// Function to add a cookie
interface AddCookieOptions {
  name: string;
  value: string;
  days?: number;
  minutes?: number;
}

export const addCookie = (options: AddCookieOptions): void => {
  const { name, value, days = 7, minutes } = options;

  if (IS_SERVER) {
    return;
  } else {
    const expirationDate = new Date();
    if (minutes !== undefined) {
      expirationDate.setTime(expirationDate.getTime() + minutes * 60 * 1000);
    } else {
      expirationDate.setDate(expirationDate.getDate() + days);
    }

    const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict`;
    document.cookie = cookieValue;
  }
};

// Function to set authentication tokens in cookies
export const setAuthTokens = (
  accessToken: string,
  refreshToken: string,
): void => {
  // Set access token with 30-minute expiration
  addCookie({
    name: "accessToken",
    value: accessToken,
    minutes: ACCESS_EXPIRATION_MINUTES,
  });

  // Set refresh token with specified days expiration
  addCookie({
    name: "refreshToken",
    value: refreshToken,
    days: REFRESH_EXPIRATION_DAYS,
  });
};

export const setAccessToken = (accessToken: string): void => {
  addCookie({
    name: "accessToken",
    value: accessToken,
    minutes: ACCESS_EXPIRATION_MINUTES,
  });
};

// Function to clear authentication tokens
export const clearAuthTokens = (): void => {
  // Expire tokens immediately by setting negative expiration
  addCookie({ name: "accessToken", value: "", days: -1 });
  addCookie({ name: "refreshToken", value: "", days: -1 });
};

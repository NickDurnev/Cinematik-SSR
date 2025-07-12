import { apiClient } from "@/libs/axios";
import ErrorHelper from "@/libs/error-helper";
import { IApiResponse } from "@/types/general";
import {
  IAuthCredentialsDto,
  IAuthData,
  ILoginCredentialsDto,
  ISocialLoginDto,
} from "@/types/user";

export const signUpUser = async (
  dto: IAuthCredentialsDto,
): Promise<IAuthData> => {
  try {
    const response = await apiClient.post<IApiResponse<IAuthData>>(
      "auth/signup",
      dto,
    );

    if (!response.data.data) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to create user.");
  }
};

export const loginUser = async (
  dto: ILoginCredentialsDto,
): Promise<IAuthData> => {
  try {
    const response = await apiClient.post<IApiResponse<IAuthData>>(
      "auth/signin",
      dto,
    );

    if (!response.data.data) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to login.");
  }
};

export const socialLoginUser = async (
  dto: ISocialLoginDto,
): Promise<IAuthData> => {
  try {
    const response = await apiClient.post<IApiResponse<IAuthData>>(
      "auth/social-login",
      dto,
    );

    if (!response.data.data) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to login.");
  }
};

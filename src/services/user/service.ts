import { apiClient } from "@/libs/axios";
import ErrorHelper from "@/libs/error-helper";
import { IApiResponse } from "@/types/general";
import {
  IAuthCredentialsDto,
  ILoginCredentialsDto,
  ITokensData,
  ISocialLoginDto,
} from "@/types/user";

export const signUpUser = async (
  dto: IAuthCredentialsDto,
): Promise<ITokensData> => {
  try {
    const response = await apiClient.post<IApiResponse<ITokensData>>(
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
): Promise<ITokensData> => {
  try {
    const response = await apiClient.post<IApiResponse<ITokensData>>(
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
): Promise<ITokensData> => {
  try {
    const response = await apiClient.post<IApiResponse<ITokensData>>(
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

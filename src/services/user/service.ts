import { apiClient } from "@/libs/axios";
import ErrorHelper from "@/libs/error-helper";
import { IApiResponse } from "@/types/general";
import {
  IAuthCredentialsDto,
  IAuthData,
  IForgotPasswordDto,
  ILoginCredentialsDto,
  IResetPasswordDto,
  ISocialLoginDto,
  IUpdateUserProfileDto,
  IUser,
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

export const getUserProfile = async (): Promise<IUser | null> => {
  try {
    const response = await apiClient.get<IApiResponse<IUser>>("/profile");
    return response?.data?.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to fetch profile.");
  }
};

export const updateUserProfile = async (
  dto: IUpdateUserProfileDto,
): Promise<IUser> => {
  try {
    const response = await apiClient.patch<IApiResponse<IUser>>(
      "/profile",
      dto,
    );
    if (!response.data.data) {
      throw new Error(
        response.data.message || "Failed to update user profile.",
      );
    }
    return response.data.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to fetch profile.");
  }
};

export const forgotPassword = async (
  dto: IForgotPasswordDto,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.post<
      IApiResponse<{ success: boolean; message: string }>
    >("auth/forgot-password", dto);

    if (!response.data.data) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to login.");
  }
};

export const resetPassword = async (
  dto: IResetPasswordDto,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.post<
      IApiResponse<{ success: boolean; message: string }>
    >("auth/reset-password", dto);

    if (!response.data.data) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to login.");
  }
};

export const confirmEmail = async (
  token: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.get<
      IApiResponse<{ success: boolean; message: string }>
    >(`auth/confirm-email?token=${token}`);

    if (!response.data.data) {
      throw new Error(response.data.message);
    }

    return response.data.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to confirm email.");
  }
};

import { axiosInstance } from "@/libs/axios";
import ErrorHelper from "@/libs/error-helper";
import { IApiResponse } from "@/types/general";
import { IAuthCredentialsDto, ITokensData } from "@/types/user";

export const signUpUser = async (
  data: IAuthCredentialsDto,
): Promise<ITokensData> => {
  try {
    const response = await axiosInstance.post<IApiResponse<ITokensData>>(
      "auth/signup",
      data,
    );

    return response.data.data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to create user.");
  }
};

export const loginUser = async (
  data: Pick<IAuthCredentialsDto, "email" | "password">,
): Promise<IApiResponse<ITokensData>> => {
  try {
    const response = await axiosInstance.post<IApiResponse<ITokensData>>(
      "auth/signin",
      data,
    );

    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to login");
  }
};

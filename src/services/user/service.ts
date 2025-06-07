import { axiosInstance } from "@/libs/axios";

import { IAuthUserData, IUser } from "@/services/user/types";
import { IApiResponse } from "@/types/general";

export const addUser = async (
  user: IAuthUserData,
): Promise<IApiResponse<IUser>> => {
  try {
    const response = await axiosInstance.post<IApiResponse<IUser>>(
      "api/users",
      user,
    );

    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to add user");
  }
};

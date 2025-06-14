import { axiosInstance } from "@/libs/axios";

import { IApiResponse } from "@/types/general";
import { IAuthUserData, IUser } from "@/types/user";

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

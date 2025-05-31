import { IAuthUserData, IUser } from "@/services/user/types";
import { IApiResponse } from "@/types/general";

export const addUser = async (
  user: IAuthUserData
): Promise<IApiResponse<IUser>> => {
  try {
    const response = await fetch("api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (e) {
    console.error(e);
    throw new Error("Failed to add user");
  }
};

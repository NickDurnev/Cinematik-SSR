import { imdbApiClient } from "@/libs/axios";
import ErrorHelper from "@/libs/error-helper";
import { IActor } from "@/types/general";

export const actorDetails = async ({
  actorId,
}: {
  actorId: string;
}): Promise<IActor> => {
  try {
    const response = await imdbApiClient.get(`person/${actorId}`);
    const data = await response.data;
    return data;
  } catch (error) {
    const errorMessage = ErrorHelper.getMessage(error);
    throw new Error(errorMessage ?? "Failed to get actor details");
  }
};

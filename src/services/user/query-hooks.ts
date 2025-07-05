import { useMutation } from "@tanstack/react-query";
import { setAuthTokens } from "@/utils/cookies";
import { ITokensData } from "@/types/user";

import { signUpUser } from "@/services/user/service";

export const useSignUpUser = () => {
  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: signUpUser,
    onSuccess: (optimisticData: ITokensData) => {
      setAuthTokens(optimisticData.access_token, optimisticData.refresh_token);
      return optimisticData;
    },
  });
};

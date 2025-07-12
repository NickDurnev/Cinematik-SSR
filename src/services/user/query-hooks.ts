import { useMutation } from "@tanstack/react-query";

import { UserStore, useUserStore } from "@/hooks/stores";
import {
  loginUser,
  signUpUser,
  socialLoginUser,
} from "@/services/user/service";
import { IAuthData } from "@/types/user";
import { setAuthTokens } from "@/utils/cookies";

export const useSignUpUser = () => {
  const setUser = useUserStore((state: UserStore) => state.setUser);

  return useMutation({
    mutationKey: ["sign-up"],
    mutationFn: signUpUser,
    onSuccess: (optimisticData: IAuthData) => {
      setAuthTokens(
        optimisticData.tokens.access_token,
        optimisticData.tokens.refresh_token,
      );
      setUser(optimisticData.user);
      return optimisticData;
    },
  });
};

export const useLoginUser = () => {
  const setUser = useUserStore((state: UserStore) => state.setUser);

  return useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
    onSuccess: (optimisticData: IAuthData) => {
      setAuthTokens(
        optimisticData.tokens.access_token,
        optimisticData.tokens.refresh_token,
      );
      setUser(optimisticData.user);
      return optimisticData;
    },
  });
};

export const useSocialLoginUser = () => {
  const setUser = useUserStore((state: UserStore) => state.setUser);

  return useMutation({
    mutationKey: ["social-login"],
    mutationFn: socialLoginUser,
    onSuccess: (optimisticData: IAuthData) => {
      console.log("🚀 ~ useSocialLoginUser ~ optimisticData:", optimisticData);
      setAuthTokens(
        optimisticData.tokens.access_token,
        optimisticData.tokens.refresh_token,
      );
      setUser(optimisticData.user);
      return optimisticData;
    },
  });
};

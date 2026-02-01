"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { UserStore, useUserStore } from "@/hooks/stores";
import { DEFAULT_USER } from "@/utils/constants";
import { clearAuthTokens } from "@/utils/cookies";

export const useLogout = () => {
  const setUser = useUserStore((state: UserStore) => state.setUser);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    queryClient.clear();
    router.replace("/");
    clearAuthTokens();
    setUser(DEFAULT_USER);
  };

  return { handleLogout };
};

export default useLogout;

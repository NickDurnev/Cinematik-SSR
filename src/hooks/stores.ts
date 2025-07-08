"use client";

import { create } from "zustand";

import { IUser } from "@/types/user";

export interface UserStore {
  user: IUser;
  setUser: (user: IUser) => void;
}

export const useUserStore = create<UserStore>(set => ({
  user: {
    id: "",
    email: "",
    name: "",
    picture: "",
    leftReview: false,
  },
  setUser: (user: IUser) => set({ user }),
}));

export default useUserStore;

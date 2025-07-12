"use client";

import { create } from "zustand";
import { PersistStorage, persist } from "zustand/middleware";

import { IUser } from "@/types/user";

export interface UserStore {
  user: IUser;
  setUser: (user: IUser) => void;
}

// Create a sessionStorage adapter
const sessionStorageAdapter: PersistStorage<UserStore> = {
  getItem: name => {
    const str = sessionStorage.getItem(name);
    if (!str) {
      return null;
    }
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    sessionStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: name => {
    sessionStorage.removeItem(name);
  },
};

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: {
        id: "",
        email: "",
        name: "",
        picture: "",
        is_left_review: false,
      },
      setUser: (user: IUser) => set({ user }),
    }),
    {
      name: "user-storage", // unique name for the storage key
      storage: sessionStorageAdapter, // use our custom sessionStorage adapter
    },
  ),
);

export default useUserStore;

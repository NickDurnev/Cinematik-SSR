"use client";

import { create } from "zustand";
import { PersistStorage, persist } from "zustand/middleware";

import { IUser } from "@/types/user";
import { DEFAULT_USER } from "@/utils/constants";

export interface UserStore {
  user: IUser;
  setUser: (user: IUser) => void;
  _hasHydrated?: boolean;
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

// Module-level variable to store set function for hydration workaround
let userStoreSet: ((state: Partial<UserStore>) => void) | undefined;

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => {
      userStoreSet = set;
      return {
        user: DEFAULT_USER,
        setUser: (user: IUser) => set({ user }),
        _hasHydrated: false,
      };
    },
    {
      name: "user-storage", // unique name for the storage key
      storage: sessionStorageAdapter, // use our custom sessionStorage adapter
      onRehydrateStorage: () => {
        return () => {
          userStoreSet && userStoreSet({ _hasHydrated: true });
        };
      },
    },
  ),
);

// Custom hook to access hydration state
export const useUserStoreHydrated = () =>
  useUserStore(state => state._hasHydrated);

export default useUserStore;

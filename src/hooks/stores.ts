"use client";

import { create } from "zustand";
import { PersistStorage, persist } from "zustand/middleware";

import { IGenre } from "@/types/movie";
import { IFormsData, IUser } from "@/types/user";
import { DEFAULT_FORM_DATA, DEFAULT_USER } from "@/utils/constants";

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

export interface UserStore {
  user: IUser;
  setUser: (user: IUser) => void;
  _hasHydrated?: boolean;
}

// Module-level variable to store set function for hydration workaround
let userStoreSet: ((state: Partial<UserStore>) => void) | undefined;

export const useUserStore = create<UserStore>()(
  persist(
    set => {
      userStoreSet = set;
      return {
        user: DEFAULT_USER,
        setUser: (user: IUser) => set({ user }),
        _hasHydrated: false,
      };
    },
    {
      name: "user-storage",
      storage: sessionStorageAdapter,
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

export interface FormsDataStore {
  data: IFormsData;
  setData: (data: IFormsData) => void;
}

export const useFormsDataStore = create<FormsDataStore>()(
  persist(
    set => {
      return {
        data: DEFAULT_FORM_DATA,
        setData: (data: IFormsData) => set({ data }),
        _hasHydrated: false,
      };
    },
    {
      name: "forms-data-storage",
      storage: sessionStorageAdapter,
    },
  ),
);

type IMoviesData = {
  genres: IGenre[];
};

export interface MoviesDataStore {
  data: {
    genres: IGenre[];
  };
  setData: (data: IMoviesData) => void;
}

export const useMoviesDataStore = create<MoviesDataStore>()(
  persist(
    set => {
      return {
        data: { genres: [] },
        setData: (data: IMoviesData) => set({ data }),
        _hasHydrated: false,
      };
    },
    {
      name: "movies-data-storage",
      storage: sessionStorageAdapter,
    },
  ),
);

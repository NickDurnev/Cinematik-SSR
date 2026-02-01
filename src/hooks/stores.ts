"use client";

import { create } from "zustand";
import { PersistStorage, persist } from "zustand/middleware";

import { ContentFilters, ContentType, IGenre } from "@/types/general";
import { ILibraryMoviePartial } from "@/types/library";
import { IFormsData, IUser } from "@/types/user";
import {
  DEFAULT_CONTENT_FILTERS,
  DEFAULT_FORM_DATA,
  DEFAULT_USER,
} from "@/utils/constants";
import { IMovie } from "@/types/movie";

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

export interface ContentDataStore {
  movieGenres: IGenre[];
  setMovieGenres: (genres: IGenre[]) => void;
  tvShowGenres: IGenre[];
  setTVShowGenres: (genres: IGenre[]) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  contentType: ContentType;
  setContentType: (contentType: ContentType) => void;
  contentFilters: ContentFilters;
  setContentFilters: (contentFilters: ContentFilters) => void;
  library: ILibraryMoviePartial[];
  setLibrary: (library: ILibraryMoviePartial[]) => void;
  movieInfo: IMovie | null,
  setMovieInfo: (movieInfo: IMovie) => void;
  isChangedPage: boolean;
  setIsChangedPage: (isChangedPage: boolean) => void;
}

export const useContentDataStore = create<ContentDataStore>()(
  persist(
    set => ({
      movieGenres: [],
      setMovieGenres: (genres: IGenre[]) => set({ movieGenres: genres }),
      tvShowGenres: [],
      setTVShowGenres: (genres: IGenre[]) => set({ tvShowGenres: genres }),
      searchValue: "",
      setSearchValue: (value: string) => set({ searchValue: value }),
      contentType: ContentType.MOVIE,
      setContentType: (contentType: ContentType) => set({ contentType }),
      contentFilters: DEFAULT_CONTENT_FILTERS,
      setContentFilters: (contentFilters: ContentFilters) =>
        set({ contentFilters }),
      library: [],
      setLibrary: (library: ILibraryMoviePartial[]) => set({ library }),
      movieInfo: null,
      setMovieInfo: (movieInfo: IMovie | null) => set({ movieInfo }),
      isChangedPage: false,
      setIsChangedPage: (isChangedPage: boolean) => set({ isChangedPage }),
      _hasHydrated: false,
    }),
    {
      name: "movies-data-storage",
      storage: sessionStorageAdapter,
    },
  ),
);

export const useMovieGenres = () =>
  useContentDataStore(state => state.movieGenres);
export const useMovieGenresSetter = () =>
  useContentDataStore(state => state.setMovieGenres);

export const useTVShowGenres = () =>
  useContentDataStore(state => state.tvShowGenres);
export const useTVShowGenresSetter = () =>
  useContentDataStore(state => state.setTVShowGenres);

export const useMovieInfo = () =>
  useContentDataStore(state => state.movieInfo);
export const useMovieInfoSetter = () =>
  useContentDataStore(state => state.setMovieInfo);

export const useMoviesLibrary = () =>
  useContentDataStore(state => state.library);

export const useSearchValueSetter = () =>
  useContentDataStore(state => state.setSearchValue);
export const useSearchValue = () =>
  useContentDataStore(state => state.searchValue);

export const useIsChangedPage = () =>
  useContentDataStore(state => state.isChangedPage);
export const useIsChangedPageSetter = () =>
  useContentDataStore(state => state.setIsChangedPage);

export const useContentType = () =>
  useContentDataStore(state => state.contentType);
export const useContentTypeSetter = () =>
  useContentDataStore(state => state.setContentType);

export const useContentFilters = () =>
  useContentDataStore(state => state.contentFilters);
export const useContentFiltersSetter = () =>
  useContentDataStore(state => state.setContentFilters);

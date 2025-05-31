import { IUser } from "@/services/user/types";
import { create } from "zustand";

export interface UserStore {
  user: IUser;
  setUser: (user: IUser) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    _id: "",
    email: "",
    name: "",
    picture: "",
    leftReview: false,
  },
  setUser: (user: IUser) => set({ user }),
}));

export default useUserStore;

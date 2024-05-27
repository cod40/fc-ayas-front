import { create } from "zustand";
import { persist } from "zustand/middleware";

type AccessToken = {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  removeAccessToken: () => void;
};

type AttedsItem = {
  Date: string;
  ID: number;
  Time: string;
  UserID: number;
};

type UserInfoItem = {
  Attends: AttedsItem[];
  ID: number;
  Name: string;
  Nickname: string;
  phone: string;
};

type UserInfo = {
  userInfo: UserInfoItem;
  userID: string;
  setUserInfo: (newUserInfo: UserInfoItem) => void;
  setUserID: (newUserID: string) => void;
  removeUserInfo: () => void;
};

export const useAccessToken = create<AccessToken>()(
  persist(
    (set, get) => ({
      accessToken: "",
      setAccessToken: (accessToken) => set({ accessToken }),
      removeAccessToken: () => set({ accessToken: "" }),
    }),
    {
      name: "accessToken",
      getStorage: () => sessionStorage,
    }
  )
);

const initialUserInfo: UserInfoItem = {
  Attends: [],
  ID: 0,
  Name: "",
  Nickname: "",
  phone: "",
};

export const useUserInfo = create<UserInfo>((set, get) => ({
  userInfo: initialUserInfo,
  userID: "",

  setUserInfo: (userInfo) => set({ userInfo }),
  removeUserInfo: () => set({ userInfo: initialUserInfo }),
  setUserID: (userID) => set({ userID }),
}));

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
  setUserInfo: (newUserInfo: UserInfoItem) => void;
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
  setUserInfo: (userInfo) => set({ userInfo }),
  removeUserInfo: () => set({ userInfo: initialUserInfo }),
}));

//export const useUserInfo = create<UserInfo>((set, get) => ({
//   userInfo: {
//     Attends: { Date: '', ID: 0, Time: '', UserID: 0 }, // AttedsItem의 기본값
//     ID: 0,
//     Name: '',
//     Nickname: '',
//     phone: '',
//   },
//   setUserInfo: (userInfo) => set({ userInfo }),
//   removeUserInfo: () => set({
//     userInfo: {
//       Attends: { Date: '', ID: 0, Time: '', UserID: 0 },
//       ID: 0,
//       Name: '',
//       Nickname: '',
//       phone: '',
//     }
//   }),
// }));
// 휴대폰 번호 (-제외)

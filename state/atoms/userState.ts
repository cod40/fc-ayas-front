import { atom } from "recoil";

export const attendsState = atom({
  key: "attendsState",
  default: [],
});

export const accessTokenState = atom({
  key: "accessToken",
  default: "",
});

export const userInfoState = atom({
  key: "userInfo",
  default: {},
});
//data:
// Attends: []
// Email: "",
// ID: 41,
// Name: "사공용협",
// Nickname: "해물볶음",

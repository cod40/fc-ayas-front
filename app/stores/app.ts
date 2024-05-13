import { create } from "zustand";

export type AttendDate = {
  [key: string]: AttendDateItem | null;
};

export type AttendDateItem = {
  [key: string]: string[];
};

type AppStore = {
  attends: AttendDate;
  setAttends: (attends: AttendDate) => void;
};

export const useAppStore = create<AppStore>((set, get) => ({
  attends: {},
  setAttends: (attends) => set({ attends }),
}));

import { create } from "zustand";

export type AttendDate = {
  [key: string]: AttendDateItem | null;
};

export type AttendDateItem = {
  [key: string]: string[];
};

export type AdditionalProps = {
  formattedDate: string;
  userAttendDates: { [key: string]: string[] };
  className: string;
};

export type OnCloseType = {
  onClose: () => void;
};

type AppStore = {
  attends: AttendDate;
  setAttends: (attends: AttendDate) => void;
};

export const useAppStore = create<AppStore>((set, get) => ({
  attends: {},
  setAttends: (attends) => set({ attends }),
}));

// const useStore = create(persist((set, get) => ({
//     bears: 0,
//     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 }),
//     updateBears: (newBears) => set({ bears: newBears }),
//   }),
//   {
//     name: 'bear-storage', // sessionStorage에 저장될 때 사용될 key 이름
//     getStorage: () => sessionStorage // 사용할 저장소 지정
//   }
// )); // 이런 식으로 sessionStorage에 저장하고 새로고침해도 배로 갖고 올 수 있다.

import { create } from "zustand";

export enum Modals {
  LOG_IN = "LOG_IN",
  CREATE_ACCOUNT = "CREATE_ACCOUNT",
  DAY_DETAIL_LIST = "DAY_DETAIL_LIST",
}

export type ModalType = keyof typeof Modals;

type ModalStore = {
  opened: ModalType[];
  openModal: (modal: ModalType, props?: any) => void;
  closeModal: (modal: ModalType) => void;
};

export const useModalStore = create<ModalStore>((set, get) => ({
  opened: [],
  openModal: (modal: ModalType, props?: any) => {
    const { opened } = get();
    set({ opened: [...opened, modal], props: props });
  },
  closeModal: (modal: ModalType) => {
    const { opened } = get();
    set({ opened: opened.filter((m) => m !== modal), props: null });
  },
}));

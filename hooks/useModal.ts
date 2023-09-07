import { create } from "zustand";
export type ModalType = "change-info";

type ModalState = {
  type: ModalType | null;
  id: string | null;
  open: boolean;
  onOpen: (type: ModalType | null, id: string | null) => void;
  onClose: () => void;
};

export const useModal = create<ModalState>((set) => ({
  type: null,
  open: false,
  id: null,
  onOpen: (type, id) => set({ open: true, type, id }),
  onClose: () => set({ type: null, open: false }),
}));

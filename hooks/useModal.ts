import { create } from "zustand";
export type ModalType = "change-info" | "unfollow";

type ModalState = {
  type: ModalType | null;
  id: string | null;
  user: PublicUser | null;
  open: boolean;
  onOpen: (
    type: ModalType | null,
    id: string | null,
    user: PublicUser | null
  ) => void;
  onClose: () => void;
};

export const useModal = create<ModalState>((set) => ({
  type: null,
  open: false,
  id: null,
  user: null,
  onOpen: (type, id, user) => set({ open: true, type, id, user }),
  onClose: () => set({ type: null, open: false, id: null, user: null }),
}));

import { createContext } from "react";
import type { Modal } from "../../types/modal";

export interface ModalContextType {
  modals: Modal[];
  openModal: (modal: Omit<Modal, "id">) => string;
  closeModal: (id: string) => void;
  closeAll: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);
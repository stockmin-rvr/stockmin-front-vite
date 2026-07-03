import { useContext } from "react";
import { ModalContext } from "../components/modal/ModalContext";


export function useModal() {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      "useModal debe utilizarse dentro de un ModalProvider."
    );
  }

  return context;
}
import { useCallback, useState } from "react";

import AnimatedModal from "./AnimatedModal";
import { ModalContext } from "./ModalContext";
import type { Modal } from "../../types/modal";

interface Props {
    children: React.ReactNode;
}

export default function ModalProvider({ children }: Props) {
    const [modals, setModals] = useState<Modal[]>([]);

    const openModal = useCallback(
        (modal: Omit<Modal, "id">): string => {
            const id = crypto.randomUUID();

            setModals((prev) => [
                ...prev,
                {
                    id,
                    ...modal,
                },
            ]);

            return id;
        },
        []
    );

    const closeModal = useCallback((id: string) => {
        setModals((prev) => prev.filter((modal) => modal.id !== id));
    }, []);

    const closeAll = useCallback(() => {
        setModals([]);
    }, []);

    return (
        <ModalContext.Provider
            value={{
                modals,
                openModal,
                closeModal,
                closeAll,
            }}
        >
            {children}

            {modals.map((modal, index) => (
                <AnimatedModal
                    key={modal.id}
                    modal={modal}
                    index={index}
                    onClose={() => closeModal(modal.id)}
                />
            ))}
        </ModalContext.Provider>
    );
}
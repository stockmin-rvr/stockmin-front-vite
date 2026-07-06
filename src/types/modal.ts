export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalRenderProps {
    close: () => void;
}

export interface Modal {
    id: string;
    title?: string;
    size?: ModalSize;
    closeOnOutside?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;

    render: (props: ModalRenderProps) => React.ReactNode;
}
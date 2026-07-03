import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import type { Modal } from "../../types/modal";

interface AnimatedModalProps {
  modal: Modal;
  index: number;
  onClose: () => void;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
  full: "max-w-[95vw]",
};

export default function AnimatedModal({
  modal,
  index,
  onClose,
}: AnimatedModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  const handleClose = () => {
    setIsOpen(false);

    setTimeout(() => {
      onClose();
    }, 250);
  };

  useEffect(() => {
    if (!modal.closeOnEscape) return;

    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, [modal.closeOnEscape]);

  return (
    <div
      style={{ zIndex: 1000 + index }}
      className={`fixed inset-0 flex items-center justify-center transition-all duration-300
        ${isOpen ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0"}
      `}
      onMouseDown={() => {
        if (modal.closeOnOutside) {
          handleClose();
        }
      }}
    >
      <div
        className={`relative w-[95%] ${sizeClasses[modal.size ?? "md"]} rounded-2xl bg-content shadow-xl overflow-hidden transition-all duration-300
          ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-5 opacity-0"}
        `}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {modal.showCloseButton !== false && (
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 hover:bg-secondary-300 text-secondary-300 hover:text-white px-3 py-1 rounded-bl-xl cursor-pointer transition-all duration-100"
          >
            <IoClose size={20} />
          </button>
        )}

        {modal.title && (
          <div className="">
            <h2 className="text-sm py-1 px-3 uppercase text-neutral-600">
              {modal.title}
            </h2>
          </div>
        )}
        <div className="p-4">
          {modal.render({
            close: handleClose,
          })}
        </div>
      </div>
    </div>
  );
}
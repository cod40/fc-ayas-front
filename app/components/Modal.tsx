"use client";

import { ModalType, useModalStore } from "../stores/modal";
import { cn } from "@/lib/utils";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import { useEffect } from "react";

type ModalProps = HTMLMotionProps<"div"> & {
  id: ModalType;
  backdrop?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

export default function Modal(props: ModalProps) {
  const { id, children, backdrop = true, onClose, className } = props;

  const opened = useModalStore((state) => state.opened);
  const closeModal = useModalStore((state) => state.closeModal);
  const visible = opened.includes(id);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      onClose?.();
    }

    return () => {
      if (visible) closeModal(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={id}
          className={cn(
            "fixed left-0 top-0 z-[99999] flex h-screen w-screen items-center justify-center",
            className
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {backdrop && (
            <div
              className="absolute left-0 top-0 z-0 h-screen w-screen bg-black bg-opacity-50 backdrop-blur-[2px]"
              onClick={() => {
                closeModal(id);
              }}
            />
          )}
          <div className="relative z-10 flex h-screen max-h-[100dvh] w-[450px] max-w-full flex-col overflow-visible rounded-[10px] border border-[#212121] bg-black py-[25px] hide-scrollbar mobile:h-fit mobile:min-h-[500px] mobile:w-[400px]">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

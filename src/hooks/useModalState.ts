import { useState } from "react";

type ModalType =
  | "clockIn"
  | "clockOut"
  | "break"
  | "cancelBreak"
  | "custom"
  | null;

export const useModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [isCustomTimeOpen, setIsCustomTimeOpen] = useState(false);

  const openModal = (type: ModalType) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  const openCustomTime = () => {
    setIsCustomTimeOpen(true);
    setModalType("custom");
  };

  const closeCustomTime = () => {
    setIsCustomTimeOpen(false);
    setModalType(null);
  };

  return {
    isModalOpen,
    modalType,
    isCustomTimeOpen,
    openModal,
    closeModal,
    openCustomTime,
    closeCustomTime,
  };
};

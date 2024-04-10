import { ReactNode, createContext, useContext, useState } from "react";
import { MessageType } from "@/components/Dialog";

interface ModalContent {
  dialogType: MessageType;
  title?: string;
  content?: string;
}

export enum DisplayMode {
  Dialog,
  Checklist,
}

const ModalContext = createContext<{
  displayMode: DisplayMode;
  isOpen: boolean;
  modalContent: ModalContent;
  show(mode: DisplayMode, content?: ModalContent): void;
  hide(): void;
}>({
  displayMode: DisplayMode.Dialog,
  isOpen: false,
  modalContent: { dialogType: MessageType.Success },
  show: () => {},
  hide: () => {},
});

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayMode, setDisplayMode] = useState(DisplayMode.Dialog);
  const [modalContent, setModalContent] = useState<ModalContent>({
    dialogType: MessageType.Success,
  });

  const showModal = (mode: DisplayMode, content?: ModalContent) => {
    setDisplayMode(mode);
    if (content) {
      setModalContent(content);
    }

    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const value = {
    displayMode,
    isOpen,
    modalContent,
    show: showModal,
    hide: hideModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { useModal, ModalProvider };

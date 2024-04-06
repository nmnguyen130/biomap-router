import { ReactNode, createContext, useContext, useState } from "react";

interface ValueProvided {
  show: boolean;
  toggleShow: () => void;
  setShow: (value: boolean) => void;
}

const ModalContext = createContext<ValueProvided>({
  show: false,
  toggleShow: () => {},
  setShow: () => {},
});

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <ModalContext.Provider value={{ show, toggleShow, setShow }}>
      {children}
    </ModalContext.Provider>
  );
};

const useSheet = () => useContext(ModalContext);

export { useSheet, ModalProvider };

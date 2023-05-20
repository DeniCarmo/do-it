import { createContext, useState } from 'react';

export const CreateListModalContext = createContext({
  modalOpen: 0,
  setModalOpen: () => {},
});

export const CreateListModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(0);
  const value = { modalOpen, setModalOpen };

  return (
    <CreateListModalContext.Provider value={value}>{children}</CreateListModalContext.Provider>
  );
};

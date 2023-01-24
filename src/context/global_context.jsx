import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    msg: '',
    type: '',
    show: false
  });

  const showAlert = (msg = '', type = '', show = false) => {
    setAlert({ msg, type, show });
  };

  return (
    <AppContext.Provider
      value={{
        alert,
        showAlert,
        setAlert
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

import React, { createContext, useState, useContext } from "react";
import CustomDialog from "../components/atoms/custom-ui/CustomDialog";

const DialogContext = createContext();

export const useDialog = () => useContext(DialogContext);

const DialogContextProvider = ({ children }) => {
  const [dialog, setDialog] = useState({
    open: false,
    title: "",
    text: "",
    action: "",
    confirmAction: null,
  });

  const showDialog = (title, text, action, confirmAction) => {
    setDialog({ open: true, title, text, action, confirmAction });
  };

  const handleClose = () => {
    setDialog({ ...dialog, open: false });
  };

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <CustomDialog
        open={dialog.open}
        closeDialog={handleClose}
        title={dialog.title}
        text={dialog.text}
        action={dialog.action}
        confirmAction={dialog.confirmAction}
      />
    </DialogContext.Provider>
  );
};

export default DialogContextProvider;

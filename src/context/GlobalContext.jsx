import React from "react";
import TableContextProvider from "./TableContext";
import FilterContextProvider from "./FilterContext";
import SnackbarContextProvider from "./SnackbarContext";
import DialogContextProvider from "./DialogContext";

const GlobalContextProvider = ({ children }) => {
  return (
    <TableContextProvider>
      <FilterContextProvider>
        <DialogContextProvider>
          <SnackbarContextProvider>{children}</SnackbarContextProvider>
        </DialogContextProvider>
      </FilterContextProvider>
    </TableContextProvider>
  );
};

export default GlobalContextProvider;

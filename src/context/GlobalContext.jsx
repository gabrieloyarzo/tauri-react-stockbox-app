import React from "react";
import UserContextProvider from "./UserContext";
import TableContextProvider from "./TableContext";
import FilterContextProvider from "./FilterContext";
import SnackbarContextProvider from "./SnackbarContext";
import DialogContextProvider from "./DialogContext";

const GlobalContextProvider = ({ children }) => {
  return (
    <UserContextProvider>
      <TableContextProvider>
        <FilterContextProvider>
          <DialogContextProvider>
            <SnackbarContextProvider>{children}</SnackbarContextProvider>
          </DialogContextProvider>
        </FilterContextProvider>
      </TableContextProvider>
    </UserContextProvider>
  );
};

export default GlobalContextProvider;

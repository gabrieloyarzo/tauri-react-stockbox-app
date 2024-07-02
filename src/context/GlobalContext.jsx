import React from "react";
import UserContextProvider from "./UserContext";
import TableContextProvider from "./TableContext";
import FilterContextProvider from "./FilterContext";
import SnackbarContextProvider from "./SnackbarContext";
import DialogContextProvider from "./DialogContext";
import VariablesContextProvider from "./VariablesContext";

const GlobalContextProvider = ({ children }) => {
  return (
    <VariablesContextProvider>
      <UserContextProvider>
        <TableContextProvider>
          <FilterContextProvider>
            <DialogContextProvider>
              <SnackbarContextProvider>{children}</SnackbarContextProvider>
            </DialogContextProvider>
          </FilterContextProvider>
        </TableContextProvider>
      </UserContextProvider>
    </VariablesContextProvider>
  );
};

export default GlobalContextProvider;

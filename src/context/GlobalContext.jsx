import React from "react";
import TableContextProvider from "./TableContext"
import FilterContextProvider from "./FilterContext";

const GlobalContextProvider = ({ children }) => {
  return (
      <TableContextProvider>
        <FilterContextProvider>
          {children}
        </FilterContextProvider>
      </TableContextProvider>
  );
};

export default GlobalContextProvider;

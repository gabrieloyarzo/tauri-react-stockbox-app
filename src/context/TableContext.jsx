import { useState, createContext } from "react";

export const TableContext = createContext();

const TableContextProvider = ({ children }) => {  
  const [currentTable, setCurrentTable] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TableContext.Provider value={{
      currentTable,
      setCurrentTable,
      isLoading,
      setIsLoading,
    }}>
      {children}
    </TableContext.Provider>
  );
};

export default TableContextProvider;
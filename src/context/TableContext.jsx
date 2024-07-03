import { useState, createContext, useContext } from "react";

export const TableContext = createContext();

export const useTable = () => {
  return useContext(TableContext);
};

const TableContextProvider = ({ children }) => {  
  const [currentTable, setCurrentTable] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tableColumns, setTableColumns] = useState([]);

  return (
    <TableContext.Provider value={{
      currentTable,
      setCurrentTable,
      isLoading,
      setIsLoading,
      tableColumns,
      setTableColumns,
    }}>
      {children}
    </TableContext.Provider>
  );
};

export default TableContextProvider;
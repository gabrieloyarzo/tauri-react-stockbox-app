import { useState, createContext } from "react";

export const FilterContext = createContext();

const FilterContextProvider = ({ children }) => {  
  const [filterProps, setFilterProps] = useState({});

  return (
    <FilterContext.Provider value={{
      filterProps,
      setFilterProps,
    }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
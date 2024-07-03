import { useState, useEffect, createContext, useContext } from "react";

export const FilterContext = createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

const FilterContextProvider = ({ children }) => {
  const [filterProps, setFilterProps] = useState({});
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filterCategories, setFilterCategories] = useState([]);

  useEffect(() => {
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: (page - 1) * 10,
    }));
  }, [page]);

  useEffect(() => {
    if (page > Math.ceil(count / 10)) {
      setPage(!(page <= 1) ? Math.ceil(count / 10) : 1);
    }
  }, [count]);

  return (
    <FilterContext.Provider
      value={{
        filterProps,
        setFilterProps,
        count,
        setCount,
        page,
        setPage,
        filterCategories,
        setFilterCategories,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;

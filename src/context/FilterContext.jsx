import { useState, useEffect, createContext, useContext } from "react";

export const FilterContext = createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

const FilterContextProvider = ({ children }) => {
  const [filterProps, setFilterProps] = useState({});
  const [page, setPage] = useState(localStorage.getItem("page") ?? 1);
  const [count, setCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedPage = localStorage.getItem("page");
    if (savedPage) {
      setPage(Number(savedPage));
      setFilterProps((prevProps) => ({
        ...prevProps,
        offset: (savedPage - 1) * 10,
      }));
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("page", page);
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
        isInitialized,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;

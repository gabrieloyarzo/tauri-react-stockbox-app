import React, { useState, createContext, useContext } from "react";

export const VariablesContext = createContext();

export const useVariables = () => useContext(VariablesContext);

const VariablesContextProvider = ({ children }) => {
  const [providers, setProviders] = useState([]);

  return (
    <VariablesContext.Provider value={{ providers, setProviders }}>
      {children}
    </VariablesContext.Provider>
  );
};

export default VariablesContextProvider;

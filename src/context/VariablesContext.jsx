import React, { useState, createContext, useContext } from "react";

export const VariablesContext = createContext();

export const useVariables = () => useContext(VariablesContext);

const VariablesContextProvider = ({ children }) => {
  const [providers, setProviders] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [providerTypes, setProviderTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [refundCodes, setRefundCodes] = useState([]);

  return (
    <VariablesContext.Provider
      value={{
        providers,
        setProviders,
        userRoles,
        setUserRoles,
        providerTypes,
        setProviderTypes,
        categories,
        setCategories,
        refundCodes,
        setRefundCodes,
      }}
    >
      {children}
    </VariablesContext.Provider>
  );
};

export default VariablesContextProvider;

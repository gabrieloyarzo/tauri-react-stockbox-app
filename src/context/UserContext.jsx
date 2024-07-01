import { useState, useEffect, createContext, useContext } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    rut: "",
    rol: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rut = localStorage.getItem("usuario");
    if (token && rut) {
      const rol = JSON.parse(atob(token.split(".")[1])).role;
      setUser({
        rut,
        rol,
      })
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
};

export default UserContextProvider;

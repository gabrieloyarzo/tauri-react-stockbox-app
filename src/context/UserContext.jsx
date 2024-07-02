import { useState, useEffect, createContext, useContext } from "react";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    rut: "",
    rol: "",
    nombre: "",
  });

  const setUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const rut = JSON.parse(atob(token.split(".")[1])).rut;
      const rol = JSON.parse(atob(token.split(".")[1])).role;
      const nombre = JSON.parse(atob(token.split(".")[1])).name.concat(
        " ",
        JSON.parse(atob(token.split(".")[1])).lastname
      );
      setUser((user) => ({
        rut: rut ?? user.rut,
        rol: rol ?? user.rol,
        nombre: nombre ?? user.nombre,
      }));
    }
  };

  useEffect(() => {
    setUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

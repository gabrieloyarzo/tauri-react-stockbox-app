import { useState, useEffect, createContext, useContext } from "react";
import { capitalizeFirstLetter } from "../functions/helpers";

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    rut: "",
    rol: "",
    nombre: "",
    apellido: "",
  });

  const setUserData = () => {
    const tokenData = localStorage.getItem("token")
      ? JSON.parse(atob(localStorage.getItem("token").split(".")[1]))
      : null;
    if (tokenData) {
      const rut = tokenData.rut;
      const rol = tokenData.role;
      const nombre = tokenData.name;
      const apellido = tokenData.lastname;
      setUser((user) => ({
        rut: rut ?? user.rut,
        rol: rol ?? user.rol,
        nombre: nombre ?? user.nombre,
        apellido: apellido ?? user.apellido,
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

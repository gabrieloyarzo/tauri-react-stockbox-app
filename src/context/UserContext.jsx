// import { useState, useEffect, createContext } from "react";
// import UserApi from "../../services/api/user.service";

// export const UserContext = createContext();

// const UserContextProvider = ({ children }) => {
//   const [user, setUser] = useState({
//     rut: "",
//     nombre: "",
//     cargo: "",
//   });

//   const [login, setLogin] = useState(false);

//   const loginUser = async (rut) => {
//     try {
//       const response = await UserApi.getUser(rut);
//       setUser({
//         rut: rut,
//         nombre: response.data.nombre,
//         cargo: response.data.rol,
//       });
//       setLogin(true);
//     } catch (error) {
//       return error;
//     }
//   };
// };

import React, { useState, useEffect } from "react";
import { usePage } from "../../hooks/usePage";
import { useTable } from "../../context/TableContext";
import { useSnackbar } from "../../context/SnackbarContext";
import { useVariables } from "../../context/VariablesContext";
import UserApi from "../../services/api/user.service";
import MainLayout from "../templates/MainLayout";
import UserForm from "../organisms/forms/UserForm";
import Reload from "../molecules/Reload";
import { iUser } from "../../functions/dataStructure";

const Users = () => {
  const { currentTable, setCurrentTable, setIsLoading, setTableColumns } =
    useTable();
  const { showSnackbar } = useSnackbar();
  const { setUserRoles } = useVariables();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  // Filters strings
  const filterStrings = Object.values(iUser)
    .filter((item) => item[1] === "string" && item[0] !== "Rol")
    .map((item) => item[0]);

  // Filters numbers
  const filterNumbers = Object.values(iUser)
    .filter((item) => item[1] === "number")
    .map((item) => item[0]);

  // Filters
  const [filterProps, setFilterProps] = useState(
    JSON.parse(localStorage.getItem("users_fprops")) ?? {
      offset: 0,
      dato: "rutu",
      valor: "",
      orden: "desc",
      rol: "todos",
    }
  );

  const { page } = usePage({ filterProps });

  const [tableData, setTableData] = useState(null);

  const fetchData = async (props) => {
    setError(null);
    setIsLoading(true);
    try {
      const users = await UserApi.getAllUsers(props);
      isFirstLoad &&
        (() => {
          showSnackbar(users.message, "success");
          setIsFirstLoad(false);
        })();

      setTableData(users.data);
      setUserRoles(users.roles);
      setCount(users.largo);

      localStorage.setItem("users_fprops", JSON.stringify(filterProps));
    } catch (error) {
      setError(error.response.data.message);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTableColumns(Object.values(iUser).map((item) => item[0]));
    setCurrentTable("users");
  }, []);

  useEffect(() => {
    fetchData(filterProps);
  }, [filterProps]);

  const [openForm, setOpenForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  if (isFirstLoad && (currentTable !== "users")) {
    return null;
  }

  return (
    <>
      {!error ? (
        <>
          <MainLayout
            currentTable="users"
            data={tableData}
            fetchData={fetchData}
            setFormProps={setFormProps}
            toggleForm={() => setOpenForm(!openForm)}
            count={count}
            page={page}
            filterProps={filterProps}
            setFilterProps={setFilterProps}
            filterStrings={filterStrings}
            filterNumbers={filterNumbers}
          />
          {openForm && (
            <UserForm
              {...formProps}
              closeForm={() => setOpenForm(false)}
              filterProps={filterProps}
            />
          )}
        </>
      ) : (
        <Reload errorMessage={error} />
      )}
    </>
  );
};

export default Users;

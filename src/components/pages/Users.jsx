import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useFilter } from "../../context/FilterContext";
import { useSnackbar } from "../../context/SnackbarContext";
import UserApi from "../../services/api/user.service";
import MainLayout from "../templates/MainLayout";
import UserForm from "../organisms/forms/UserForm";

const Users = () => {
  const { currentTable, setCurrentTable, setIsLoading } = useTable();
  const { filterProps, setCount } = useFilter();
  const { showSnackbar } = useSnackbar();

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setCurrentTable("users");
  }, []);

  const [tableData, setTableData] = useState(null);

  const fetchData = async (props) => {
    setIsLoading(true); // Establecer el estado de carga a verdadero
    try {
      const users = await UserApi.getAllUsers(props);
      isFirstLoad &&
      (() => {
        showSnackbar(users.message, "success");
        setIsFirstLoad(false);
      })();

      setTableData(users.data);
      setCount(users.largo);
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
    } finally {
      setIsLoading(false); // Establecer el estado de carga a falso
    }
  };

  useEffect(() => {
    fetchData(filterProps);
  }, [filterProps]);

  // Forms
  const [openForm, setOpenForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  if (currentTable !== "users") {
    return null;
  }

  return (
    <>
      <MainLayout
        currentTable="users"
        data={tableData}
        fetchData={fetchData}
        setFormProps={setFormProps}
        toggleForm={() => setOpenForm(!openForm)}
      />
      {openForm && (
        <UserForm
          {...formProps}
          filterProps={filterProps}
          closeForm={() => setOpenForm(false)}
        />
      )}
    </>
  );
};

export default Users;

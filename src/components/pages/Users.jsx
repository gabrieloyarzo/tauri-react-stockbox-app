import React, { useState, useEffect, useContext } from "react";
import { TableContext } from "../../context/TableContext";
import { FilterContext } from "../../context/FilterContext";
import UserApi from "../../services/api/user.service";
import MainLayout from "../templates/MainLayout";
import UserForm from "../organisms/forms/UserForm";

const Users = () => {
  const { currentTable, setCurrentTable } = useContext(TableContext);
  const { filterProps } = useContext(FilterContext);

  useEffect(() => {
    setCurrentTable("users");
  }, []);

  const [tableData, setTableData] = useState(null);
  const [count, setCount] = useState(0);

  // Loading state for table
  const [loading, setLoading] = useState(false);

  const fetchData = async (props) => {
    setLoading(true); // Establecer el estado de carga a verdadero
    try {
      const users = await UserApi.getAllUsers(props);
      setTableData(users.data);
      setCount(users.largo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Establecer el estado de carga a falso
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
        loading={loading}
        setLoading={setLoading}
        count={count}
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

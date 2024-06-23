import React, { useState, useEffect } from "react";
import UserApi from "../../services/api/user.service";
import MainLayout from "../templates/MainLayout";
import FeedbackLayout from "../templates/FeedbackLayout";
import UserForm from "../organisms/forms/UserForm";

const Users = () => {
  const [tableData, setTableData] = useState(null);
  const [count, setCount] = useState(0);

  // Filters
  const [filterProps, setFilterProps] = useState({});

  // Loading state for table
  const [loading, setLoading] = useState(false);

  const fetchData = async (props) => {
    setLoading(true); // Establecer el estado de carga a verdadero
    try {
      const users = await UserApi.getAllUsers(props);
      setTableData(
        users.data.map(({ createdAt, updatedAt, undefined, ...rest }) => rest)
      );
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

  // Dialogs
  const [modifyDialogProps, setModifyDialogProps] = useState({});
  const [discardDialogProps, setDiscardDialogProps] = useState({});

  // Snackbar
  const [snackProps, setSnackProps] = useState({});

  return (
    <>
      <MainLayout
        currentTable="users"
        data={tableData}
        fetchData={fetchData}
        setFormProps={setFormProps}
        toggleForm={() => setOpenForm(!openForm)}
        loading={loading}
        count={count}
        setFilterProps={setFilterProps}
        filterProps={filterProps}
      />
      <FeedbackLayout
        modifyDialogProps={modifyDialogProps}
        discardDialogProps={discardDialogProps}
        snackProps={snackProps}
      />
      {openForm && (
        <UserForm
          {...formProps}
          filterProps={filterProps}
          closeForm={() => setOpenForm(false)}
          setModifyDialogProps={setModifyDialogProps}
          setDiscardDialogProps={setDiscardDialogProps}
          setSnackProps={setSnackProps}
        />
      )}
    </>
  );
};

export default Users;

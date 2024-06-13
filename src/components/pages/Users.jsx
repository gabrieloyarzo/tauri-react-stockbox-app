import React, { useState, useEffect } from "react";
import UserApi from "../../services/api/user.service";
import MainLayout from "../templates/MainLayout";
import FeedbackLayout from "../templates/FeedbackLayout";
import UserForm from "../organisms/forms/UserForm";


const Users = () => {
  const [tableData, setTableData] = useState(null);

  const fetchData = async () => {
    const users = await UserApi.getAllUsers();
    setTableData(users.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Forms
  const [openForm, setOpenForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  // Dialogs
  const [modifyDialogProps, setModifyDialogProps] = useState({});
  const [discardDialogProps, setDiscardDialogProps] = useState({});

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const [snackProps, setSnackProps] = useState({});

  return (
    <>
      <MainLayout
        currentTable="users"
        data={tableData}
        fetchData={fetchData}
        setFormProps={setFormProps}
        toggleForm={() => setOpenForm(!openForm)}
      />
      <FeedbackLayout
        modifyDialogProps={modifyDialogProps}
        discardDialogProps={discardDialogProps}
        snackProps={snackProps}
      />
      {openForm && (
        <UserForm
          {...formProps}
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

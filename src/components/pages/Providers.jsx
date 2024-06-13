import React, { useState, useEffect } from "react";
import ProviderApi from "../../services/api/provider.service";
import MainLayout from "../templates/MainLayout";
import FeedbackLayout from "../templates/FeedbackLayout";
import ProviderForm from "../organisms/forms/ProviderForm";


const Providers = () => {
  const [tableData, setTableData] = useState(null);

  const fetchData = async () => {
    const providers = await ProviderApi.getAllProviders();
    console.log("Proveedores data:", providers.data)
    setTableData(providers.data);
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

  const closeSnack = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpenSnack(false);
  }

  return (
    <>
      <MainLayout
        currentTable="providers"
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
        <ProviderForm
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

export default Providers;

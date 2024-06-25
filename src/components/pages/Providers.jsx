import React, { useState, useEffect } from "react";
import ProviderApi from "../../services/api/provider.service";
import MainLayout from "../templates/MainLayout";
import FeedbackLayout from "../templates/FeedbackLayout";
import ProviderForm from "../organisms/forms/ProviderForm";

const Providers = () => {
  const [tableData, setTableData] = useState(null);
  const [count, setCount] = useState(0);

  // Filters
  const [filterProps, setFilterProps] = useState({});

  // Loading state for table
  const [loading, setLoading] = useState(false);

  const fetchData = async (props) => {
    setLoading(true); // Establecer el estado de carga a verdadero
    try {
      const providers = await ProviderApi.getAllProviders(props);
      setTableData(providers.data);
      setCount(providers.largo);
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
        currentTable="providers"
        data={tableData}
        fetchData={fetchData}
        setFormProps={setFormProps}
        toggleForm={() => setOpenForm(!openForm)}
        count={count}
        filterProps={filterProps}
        setFilterProps={setFilterProps}
        loading={loading}
      />
      <FeedbackLayout
        modifyDialogProps={modifyDialogProps}
        discardDialogProps={discardDialogProps}
        snackProps={snackProps}
      />
      {openForm && (
        <ProviderForm
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

export default Providers;

import React, { useState, useEffect } from "react";
import PurchaseApi from "../../services/api/purchase.service";
import MainLayout from "../templates/MainLayout";
import FeedbackLayout from "../templates/FeedbackLayout";
import PurchaseForm from "../organisms/forms/PurchaseForm";

const Purchases = () => {
  const [tableData, setTableData] = useState(null);
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [codes, setCodes] = useState([]);
  const [count, setCount] = useState(0);

  // Filters
  const [filterProps, setFilterProps] = useState({});

  // Loading state for table
  const [loading, setLoading] = useState(false);

  const fetchData = async (props) => {
    setLoading(true); // Establecer el estado de carga a verdadero
    try {
      const purchases = await PurchaseApi.getAllPurchases(props);
      setTableData(purchases.data);
      setProviders(purchases.providers);
      setProducts(purchases.products);
      setCodes(purchases.codes);
      setCount(purchases.largo);
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
        currentTable="purchases"
        data={tableData}
        fetchData={fetchData}
        setFormProps={setFormProps}
        toggleForm={() => setOpenForm(!openForm)}
        count={count}
        setFilterProps={setFilterProps}
        filterProps={filterProps}
        loading={loading}
      />
      <FeedbackLayout
        modifyDialogProps={modifyDialogProps}
        discardDialogProps={discardDialogProps}
        snackProps={snackProps}
      />
      {openForm && (
        <PurchaseForm
          {...formProps}
          filterProps={filterProps}
          products={products}
          providers={providers}
          codes={codes}
          closeForm={() => setOpenForm(false)}
          setModifyDialogProps={setModifyDialogProps}
          setDiscardDialogProps={setDiscardDialogProps}
          setSnackProps={setSnackProps}
        />
      )}
    </>
  );
};

export default Purchases;

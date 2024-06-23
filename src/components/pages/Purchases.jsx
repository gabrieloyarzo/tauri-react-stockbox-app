import React, { useState, useEffect } from "react";
import PurchaseApi from "../../services/api/purchase.service";
import MainLayout from "../templates/MainLayout";
import FeedbackLayout from "../templates/FeedbackLayout";
import PurchaseForm from "../organisms/forms/PurchaseForm";

const Purchases = () => {
  const [tableData, setTableData] = useState(null);
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [count, setCount] = useState(0);
  
  // Filters
  const [filterProps, setFilterProps] = useState({});

  const fetchData = async (props) => {
    const purchases = await PurchaseApi.getAllPurchases(props);
    console.log(purchases.data);
    setTableData(purchases.data.map(({ createdAt, updatedAt, undefined, ...rest }) => rest));
    setProviders(purchases.providers);
    setProducts(purchases.products);
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
        currentTable="purchases"
        data={tableData}
        fetchData={fetchData}
        setFormProps={setFormProps}
        toggleForm={() => setOpenForm(!openForm)}
        count={count}
        setFilterProps={setFilterProps}
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

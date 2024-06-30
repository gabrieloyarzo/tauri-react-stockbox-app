import React, { useState, useEffect, useContext } from "react";
import { TableContext } from "../context/TableContext";
import { FilterContext } from "../context/FilterContext";
import PurchaseApi from "../services/api/purchase.service";
import MainLayout from "../components/templates/MainLayout";
import FeedbackLayout from "../components/templates/FeedbackLayout";
import PurchaseForm from "../components/organisms/forms/PurchaseForm";

const Purchases = () => {
  const { currentTable, setCurrentTable } = useContext(TableContext);
  const { filterProps } = useContext(FilterContext);

  useEffect(() => {
    setCurrentTable("purchases");
  }, [setCurrentTable]);

  // Table related
  const [tableData, setTableData] = useState(null);
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [codes, setCodes] = useState([]);

  // Pagination
  const [count, setCount] = useState(0);

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

  if (currentTable !== "purchases") {
    return null; // O algún mensaje de espera como <p>Loading...</p>
  }

  return (
    <>
      <MainLayout
        data={tableData}
        fetchData={fetchData}
        setFormProps={setFormProps}
        toggleForm={() => setOpenForm(!openForm)}
        count={count}
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

import React, { useState, useEffect } from "react";
import PurchaseApi from "../../services/api/purchase.service";
import ProductApi from "../../services/api/product.service";
import MainLayout from "../templates/MainLayout";
import FeedbackLayout from "../templates/FeedbackLayout";
import PurchaseForm from "../organisms/forms/PurchaseForm";
import mockPurchases from "../../../mock/purchaseMocks";

const Purchases = () => {
  const [tableData, setTableData] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    // const purchases = await PurchaseApi.getAllPurchases();
    const purchases = mockPurchases;
    const products = await ProductApi.getAllProducts();

    setTableData(purchases);
    setProducts(products.data);
    setProducts([
      ...new Set(
        products.data.map((item) => ({
          idp: item.idp,
          nombre: item.nombre,
        }))
      ),
    ]);
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

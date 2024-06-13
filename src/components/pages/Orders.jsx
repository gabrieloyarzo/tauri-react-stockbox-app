import React, { useState, useEffect } from "react";
import OrderApi from "../../services/api/order.service";
import ProductApi from "../../services/api/product.service";
import MainLayout from "../templates/MainLayout";
import FeedbackLayout from "../templates/FeedbackLayout";
import OrderForm from "../organisms/forms/OrderForm";
import mockOrders from "../../../mock/orderMocks";

const Orders = () => {
  const [tableData, setTableData] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    // const orders = await OrderApi.getAllOrders();
    const orders = mockOrders;
    const products = await ProductApi.getAllProducts();

    setTableData(orders);
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

  const closeSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <>
      <MainLayout
        currentTable="orders"
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
        <OrderForm
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

export default Orders;

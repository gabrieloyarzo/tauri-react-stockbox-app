import React, { useState, useEffect } from "react";
import ProductApi from "../../services/api/product.service";
import MainLayout from "../templates/MainLayout";
import FeedbackLayout from "../templates/FeedbackLayout";
import ProductForm from "../organisms/forms/ProductForm";

const Products = () => {
  const [tableData, setTableData] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    const products = await ProductApi.getAllProducts();
    setTableData(
      products.data.map(({ createdAt, updatedAt, undefined, ...rest }) => rest)
    );
    setCategories([...new Set(products.data.map((item) => item.cat))]);
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
        currentTable="products"
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
        <ProductForm
          {...formProps}
          closeForm={() => setOpenForm(false)}
          categories={categories}
          setModifyDialogProps={setModifyDialogProps}
          setDiscardDialogProps={setDiscardDialogProps}
          setSnackProps={setSnackProps}
        />
      )}
    </>
  );
};

export default Products;

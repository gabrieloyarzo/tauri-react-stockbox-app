import React, { useState, useEffect } from "react";
import ProductApi from "../../services/api/product.service";
import MainLayout from "../templates/MainLayout";
import FeedbackLayout from "../templates/FeedbackLayout";
import ProductForm from "../organisms/forms/ProductForm";

const Products = () => {
  // Data table and related forms
  const [tableData, setTableData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  
  // Filters
  const [filterProps, setFilterProps] = useState({});

  const fetchData = async (props) => {
    const products = await ProductApi.getAllProducts(props);
    console.log(products);
    setCount(products.largo);
    setTableData(
      products.data.map(({ createdAt, updatedAt, undefined, ...rest }) => rest)
    );
    setCategories([...new Set(products.data.map((item) => item.cat))]);
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
  const [openSnack, setOpenSnack] = useState(false);
  const [snackProps, setSnackProps] = useState({});

  return (
    <>
      <MainLayout
        currentTable="products"
        data={tableData}
        fetchData={fetchData}
        filterProps={filterProps}
        setFilterProps={setFilterProps}
        setFormProps={setFormProps}
        toggleForm={() => setOpenForm(!openForm)}
        count={count}
      />
      <FeedbackLayout
        modifyDialogProps={modifyDialogProps}
        discardDialogProps={discardDialogProps}
        snackProps={snackProps}
      />
      {openForm && (
        <ProductForm
          {...formProps}
          filterProps={filterProps}
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

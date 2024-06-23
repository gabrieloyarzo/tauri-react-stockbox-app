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

  // Loading state for table
  const [loading, setLoading] = useState(false);

  const fetchData = async (props) => {
    setLoading(true); // Establecer el estado de carga a verdadero
    try {
      const products = await ProductApi.getAllProducts(props);
      setCount(products.largo);
      setTableData(
        products.data.map(({ createdAt, updatedAt, undefined, ...rest }) => rest)
      );
      setCategories(products.categorias);
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
        loading={loading}
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

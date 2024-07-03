import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useFilter } from "../../context/FilterContext";
import { useSnackbar } from "../../context/SnackbarContext";
import ProductApi from "../../services/api/product.service";
import MainLayout from "../templates/MainLayout";
import ProductForm from "../organisms/forms/ProductForm";
import Reload from "../molecules/Reload";
import { iProduct } from "../../functions/dataStructure";

const Products = () => {
  const { currentTable, setCurrentTable, setIsLoading } = useTable();
  const { filterProps, setCount, setFilterCategories } = useFilter();
  const { showSnackbar } = useSnackbar();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentTable("products");
    setFilterCategories(Object.values(iProduct));
  }, []);

  const [tableData, setTableData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [codes, setCodes] = useState([]);

  const fetchData = async (props) => {
    setError(null);
    setIsLoading(true);
    try {
      const products = await ProductApi.getAllProducts(props);
      isFirstLoad &&
        (() => {
          showSnackbar(products.message, "success");
          setIsFirstLoad(false);
        })();

      setCount(products.largo);
      setTableData(products.data);
      setCategories(products.categorias);
      setCodes(products.codes);
    } catch (error) {
      setError(error.response.data.message);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filterProps);
  }, [filterProps]);

  // Forms
  const [openForm, setOpenForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  if (currentTable !== "products") {
    return null;
  }

  return (
    <>
      {!error ? (
        <>
          <MainLayout
            data={tableData}
            fetchData={fetchData}
            setFormProps={setFormProps}
            toggleForm={() => setOpenForm(!openForm)}
          />
          {openForm && (
            <ProductForm
              {...formProps}
              closeForm={() => setOpenForm(false)}
              categories={categories}
              codes={codes}
            />
          )}
        </>
      ) : (
        <Reload errorMessage={error} />
      )}
    </>
  );
};

export default Products;

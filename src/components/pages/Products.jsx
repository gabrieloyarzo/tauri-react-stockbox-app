import React, { useState, useEffect, useContext } from "react";
import { TableContext } from "../../context/TableContext";
import { FilterContext } from "../../context/FilterContext";
import ProductApi from "../../services/api/product.service";
import MainLayout from "../templates/MainLayout";
import ProductForm from "../organisms/forms/ProductForm";

const Products = () => {
  const { currentTable, setCurrentTable, setIsLoading } = useContext(TableContext);
  const { filterProps } = useContext(FilterContext);

  useEffect(() => {
    setCurrentTable("products");
  }, []);

  // Data table and related forms
  const [tableData, setTableData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [codes, setCodes] = useState([]);
  const [count, setCount] = useState(0);

  const fetchData = async (props) => {
    setIsLoading(true); // Establecer el estado de carga a verdadero
    try {
      const products = await ProductApi.getAllProducts(props);    
      setCount(products.largo);
      setTableData(products.data);
      setCategories(products.categorias);
      setCodes(products.codes);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Establecer el estado de carga a falso
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
      <MainLayout
        data={tableData}
        fetchData={fetchData}
        setFormProps={setFormProps}
        toggleForm={() => setOpenForm(!openForm)}
        count={count}
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
  );
};

export default Products;

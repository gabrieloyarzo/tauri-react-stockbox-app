import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useSnackbar } from "../../context/SnackbarContext";
import ProductApi from "../../services/api/product.service";
import MainLayout from "../templates/MainLayout";
import ProductForm from "../organisms/forms/ProductForm";
import Reload from "../molecules/Reload";
import { iProduct } from "../../functions/dataStructure";

const Products = () => {
  const { currentTable, setCurrentTable, setIsLoading, setTableColumns } =
    useTable();
  const { showSnackbar } = useSnackbar();

  const productsPage = localStorage.getItem("products_page");
  const parsedProductsPage = productsPage !== null ? Number(productsPage) : 1;

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(parsedProductsPage);

  // Filters strings
  const filterStrings = Object.values(iProduct)
    .filter((item) => item[1] === "string")
    .map((item) => item[0]);

  // Filters numbers
  const filterNumbers = Object.values(iProduct)
    .filter((item) => item[1] === "number")
    .map((item) => item[0]);

  // Filters
  const [filterProps, setFilterProps] = useState(
    JSON.parse(localStorage.getItem("products_fprops")) ?? {
      offset: (page - 1) * 10,
      dato: "cod",
      valor: "",
      orden: "desc",
      intervalo: "igual",
    }
  );

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

      localStorage.setItem("products_fprops", JSON.stringify(filterProps));
    } catch (error) {
      setError(error.response.data.message);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTableColumns(Object.values(iProduct).map((item) => item[0]));
    setCurrentTable("products");
  }, []);

  useEffect(() => {
    fetchData(filterProps);
    const offset = filterProps?.offset ?? 0;
    const pagina = (offset + 10) / 10;
    setPage(pagina);
    localStorage.setItem("products_page", pagina);
  }, [filterProps]);

  // Forms
  const [openForm, setOpenForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  if (
    isFirstLoad &&
    (currentTable !== "products" || page !== parsedProductsPage)
  ) {
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
            count={count}
            page={page}
            setPage={setPage}
            filterProps={filterProps}
            setFilterProps={setFilterProps}
            filterStrings={filterStrings}
            filterNumbers={filterNumbers}
          />
          {openForm && (
            <ProductForm
              {...formProps}
              closeForm={() => setOpenForm(false)}
              categories={categories}
              codes={codes}
              filterProps={filterProps}
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

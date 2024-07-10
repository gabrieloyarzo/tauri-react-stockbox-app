import React, { useState, useEffect } from "react";
import { usePage } from "../../hooks/usePage";
import { useTable } from "../../context/TableContext";
import { useSnackbar } from "../../context/SnackbarContext";
import SaleApi from "../../services/api/sale.service";
import MainLayout from "../templates/MainLayout";
import SaleForm from "../organisms/forms/SaleForm";
import Reload from "../molecules/Reload";
import { iSales } from "../../functions/dataStructure";

const Sales = () => {
  const { currentTable, setCurrentTable, setIsLoading, setTableColumns } =
    useTable();
  const { showSnackbar } = useSnackbar();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  // Filters strings
  const filterStrings = Object.values(iSales)
    .filter((item) => item[1] === "string")
    .map((item) => item[0]);

  // Filters numbers
  const filterNumbers = Object.values(iSales)
    .filter((item) => item[1] === "number")
    .map((item) => item[0]);

  // Filters
  const [filterProps, setFilterProps] = useState(
    JSON.parse(localStorage.getItem("sales_fprops")) ?? {
      offset: 0,
      dato: "cod",
      desde: "",
      hasta: "",
      valor: "",
      intervalo: "igual",
      orden: "desc",
    }
  );

  const { page } = usePage({ filterProps });

  const [tableData, setTableData] = useState(null);
  const [products, setProducts] = useState([]);
  const [codes, setCodes] = useState([]);

  const fetchData = async (props) => {
    setError(null);
    setIsLoading(true);
    try {
      const sales = await SaleApi.getAllSales(props);
      isFirstLoad &&
        (() => {
          showSnackbar(sales.message, "success");
          setIsFirstLoad(false);
        })();

      setTableData(sales.data);
      setProducts(sales.products);
      setCodes(sales.codes);
      setCount(sales.largo);

      localStorage.setItem("sales_fprops", JSON.stringify(filterProps));
    } catch (error) {
      setError(error.response.data.message);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTableColumns(Object.values(iSales).map((item) => item[0]));
    setCurrentTable("sales");
  }, []);

  useEffect(() => {
    fetchData(filterProps);
  }, [filterProps]);

  const [openForm, setOpenForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  if (isFirstLoad && (currentTable !== "sales")) {
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
            filterProps={filterProps}
            setFilterProps={setFilterProps}
            filterStrings={filterStrings}
            filterNumbers={filterNumbers}
          />
          {openForm && (
            <SaleForm
              {...formProps}
              products={products}
              codes={codes}
              closeForm={() => setOpenForm(false)}
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

export default Sales;

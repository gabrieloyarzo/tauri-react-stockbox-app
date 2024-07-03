import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useFilter } from "../../context/FilterContext";
import { useSnackbar } from "../../context/SnackbarContext";
import SaleApi from "../../services/api/sale.service";
import MainLayout from "../templates/MainLayout";
import SaleForm from "../organisms/forms/SaleForm";

const Sales = () => {
  const { currentTable, setCurrentTable, setIsLoading } = useTable();
  const { filterProps, setCount } = useFilter();
  const { showSnackbar } = useSnackbar();

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setCurrentTable("sales");
  }, [setCurrentTable]);

  // Table related
  const [tableData, setTableData] = useState(null);
  const [products, setProducts] = useState([]);
  const [codes, setCodes] = useState([]);

  const fetchData = async (props) => {
    setIsLoading(true); // Establecer el estado de carga a verdadero
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
    } catch (error) {
      showSnackbar(error.response.data.message, "error");
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

  if (currentTable !== "sales") {
    return null;
  }

  return (
    <>
      <MainLayout
        data={tableData}
        fetchData={fetchData}
        setFormProps={setFormProps}
        toggleForm={() => setOpenForm(!openForm)}
      />
      {openForm && (
        <SaleForm
          {...formProps}
          products={products}
          codes={codes}
          closeForm={() => setOpenForm(false)}
        />
      )}
    </>
  );
};

export default Sales;

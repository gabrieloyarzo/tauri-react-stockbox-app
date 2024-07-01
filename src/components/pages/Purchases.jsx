import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useFilter } from "../../context/FilterContext";
import PurchaseApi from "../../services/api/purchase.service";
import MainLayout from "../templates/MainLayout";
import PurchaseForm from "../organisms/forms/PurchaseForm";

const Purchases = () => {
  const { currentTable, setCurrentTable, setIsLoading } = useTable();
  const { filterProps, isInitialized, setCount, page, setPage } = useFilter();

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setCurrentTable("purchases");
  }, [setCurrentTable]);

  // Table related
  const [tableData, setTableData] = useState(null);
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [codes, setCodes] = useState([]);

  const fetchData = async (props) => {
    setIsLoading(true); // Establecer el estado de carga a verdadero
    try {
      const purchases = await PurchaseApi.getAllPurchases(props);

      setTableData(purchases.data);
      setProviders(purchases.providers);
      setProducts(purchases.products);
      setCodes(purchases.codes);
      setCount(purchases.largo);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Establecer el estado de carga a falso
    }
  };

  useEffect(() => {
    if (isInitialized) {
      fetchData(filterProps);
      if (isFirstLoad) {
        setIsFirstLoad(false);
      }
    }
  }, [filterProps]);

  // Forms
  const [openForm, setOpenForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  if (currentTable !== "purchases") {
    return null;
  }

  return (
    <>
      <MainLayout
        data={tableData}
        fetchData={fetchData}
        setFormProps={setFormProps}
        toggleForm={() => setOpenForm(!openForm)}
        isFirstLoad={isFirstLoad}
      />
      {openForm && (
        <PurchaseForm
          {...formProps}
          products={products}
          providers={providers}
          codes={codes}
          closeForm={() => setOpenForm(false)}
        />
      )}
    </>
  );
};

export default Purchases;

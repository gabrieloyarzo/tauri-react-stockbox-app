import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useVariables } from "../../context/VariablesContext";
import { useFilter } from "../../context/FilterContext";
import { useSnackbar } from "../../context/SnackbarContext";
import PurchaseApi from "../../services/api/purchase.service";
import MainLayout from "../templates/MainLayout";
import PurchaseForm from "../organisms/forms/PurchaseForm";
import Reload from "../molecules/Reload";
import { iPurchase } from "../../functions/dataStructure";	

const Purchases = () => {
  const { currentTable, setCurrentTable, setIsLoading } = useTable();
  const { filterProps, setCount, setFilterCategories } = useFilter();
  const { setProviders } = useVariables();
  const { showSnackbar } = useSnackbar();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentTable("purchases");
    setFilterCategories(Object.values(iPurchase));
  }, []);

  // Table related
  const [tableData, setTableData] = useState(null);
  const [products, setProducts] = useState([]);
  const [codes, setCodes] = useState([]);

  const fetchData = async (props) => {
    setError(null);
    setIsLoading(true); // Establecer el estado de carga a verdadero
    try {
      const purchases = await PurchaseApi.getAllPurchases(props);
      isFirstLoad &&
        (() => {
          showSnackbar(purchases.message, "success");
          setIsFirstLoad(false);
        })();

      setTableData(purchases.data);
      setProviders(purchases.providers);
      setProducts(purchases.products);
      setCodes(purchases.codes);
      setCount(purchases.largo);
    } catch (error) {
      setError(error.response.data.message);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setIsLoading(false); // Establecer el estado de carga a falso
    }
  };

  useEffect(() => {
    if (isFirstLoad) {
      if (JSON.stringify(filterProps) === "{}") {
        fetchData(filterProps);
      }
    }
    else {
      fetchData(filterProps);
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
      {!error ? (
        <>
          <MainLayout
            data={tableData}
            fetchData={fetchData}
            setFormProps={setFormProps}
            toggleForm={() => setOpenForm(!openForm)}
          />
          {openForm && (
            <PurchaseForm
              {...formProps}
              products={products}
              codes={codes}
              closeForm={() => setOpenForm(false)}
            />
          )}
        </>
      ) : (
        <Reload errorMessage={error} />
      )}
    </>
  );
};

export default Purchases;

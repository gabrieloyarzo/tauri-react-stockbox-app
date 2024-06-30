import React, { useState, useEffect, useContext } from "react";
import { TableContext } from "../../context/TableContext";
import { FilterContext } from "../../context/FilterContext";
import PurchaseApi from "../../services/api/purchase.service";
import MainLayout from "../templates/MainLayout";
import PurchaseForm from "../organisms/forms/PurchaseForm";

const Purchases = () => {
  const { currentTable, setCurrentTable, setIsLoading } = useContext(TableContext);
  const { filterProps } = useContext(FilterContext);

  useEffect(() => {
    setCurrentTable("purchases");
  }, [setCurrentTable]);

  // Table related
  const [tableData, setTableData] = useState(null);
  const [products, setProducts] = useState([]);
  const [providers, setProviders] = useState([]);
  const [codes, setCodes] = useState([]);

  // Pagination
  const [count, setCount] = useState(0);

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
    console.log(filterProps);
    fetchData(filterProps);
  }, [filterProps]);

  // Forms
  const [openForm, setOpenForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  if (currentTable !== "purchases") {
    return null; // O algún mensaje de espera como <p>Loading...</p>
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

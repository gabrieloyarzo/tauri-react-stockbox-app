import React, { useState, useEffect } from "react";
import { usePage } from "../../hooks/usePage";
import { useTable } from "../../context/TableContext";
import { useVariables } from "../../context/VariablesContext";
import { useSnackbar } from "../../context/SnackbarContext";
import PurchaseApi from "../../services/api/purchase.service";
import MainLayout from "../templates/MainLayout";
import PurchaseForm from "../organisms/forms/PurchaseForm";
import Reload from "../molecules/Reload";
import { iPurchase } from "../../functions/dataStructure";
import ProductApi from "../../services/api/product.service"

const Purchases = () => {
  const { currentTable, setCurrentTable, setIsLoading, setTableColumns } =
    useTable();
  const { setProviders } = useVariables();
  const { showSnackbar } = useSnackbar();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  // Filters strings
  const filterStrings = Object.values(iPurchase)
    .filter((item) => item[1] === "string")
    .map((item) => item[0]);

  // Filters numbers
  const filterNumbers = Object.values(iPurchase)
    .filter((item) => item[1] === "number")
    .map((item) => item[0]);

  // Filters
  const [filterProps, setFilterProps] = useState(
    JSON.parse(localStorage.getItem("purchases_fprops")) ?? {
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

  // Table related
  const [tableData, setTableData] = useState(null);
  const [products, setProducts] = useState([]);
  const [codes, setCodes] = useState([]);

  const fetchData = async (props) => {
    setError(null);
    setIsLoading(true);
    try {
	const purchases = await PurchaseApi.getAllPurchases(props);
	const trueProducts = await ProductApi.getTrueProducts();
      isFirstLoad &&
        (() => {
          showSnackbar(purchases.message, "success");
          setIsFirstLoad(false);
        })();

      setTableData(purchases.data);
      setProviders(purchases.providers);
      setProducts(purchases.products);
      //setProducts(trueProducts.message)
      setCodes(purchases.codes);
      setCount(purchases.largo);

      localStorage.setItem("purchases_fprops", JSON.stringify(filterProps));
    } catch (error) {
      setError(error.response.data.message);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTableColumns(Object.values(iPurchase).map((item) => item[0]));
    setCurrentTable("purchases");
  }, []);

  useEffect(() => {
    fetchData(filterProps);
  }, [filterProps]);

  // Forms
  const [openForm, setOpenForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  if (isFirstLoad && currentTable !== "purchases") {
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
            <PurchaseForm
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

export default Purchases;

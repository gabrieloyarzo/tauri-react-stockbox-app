import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useFilter } from "../../context/FilterContext";
import { useSnackbar } from "../../context/SnackbarContext";
import RefundApi from "../../services/api/refund.service";
import MainLayout from "../templates/MainLayout";
import RefundForm from "../organisms/forms/RefundForm";

const Refunds = () => {
  const { currentTable, setCurrentTable, setIsLoading } = useTable();
  const { filterProps, setCount } = useFilter();
  const { showSnackbar } = useSnackbar();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentTable("refunds");
  }, [setCurrentTable]);

  // Table related
  const [tableData, setTableData] = useState(null);
  const [saleCodes, setSaleCodes] = useState([]);

  const fetchData = async (props) => {
    setError(null);
    setIsLoading(true); // Establecer el estado de carga a verdadero
    try {
      const refunds = await RefundApi.getAllRefunds(props);
      isFirstLoad &&
        (() => {
          showSnackbar(refunds.message, "success");
          setIsFirstLoad(false);
        })();

      setTableData(refunds.data);
      setSaleCodes(refunds.saleCodes);
      setCount(refunds.largo);
    } catch (error) {
      setError(error.response.data.message);
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

  if (currentTable !== "refunds") {
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
            <RefundForm
              {...formProps}
              closeForm={() => setOpenForm(false)}
              saleCodes={saleCodes}
            />
          )}
        </>
      ) : (
        <Reload errorMessage={error} />
      )}
    </>
  );
};

export default Refunds;

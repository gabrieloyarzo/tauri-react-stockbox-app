import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useFilter } from "../../context/FilterContext";
import { useSnackbar } from "../../context/SnackbarContext";
import ProviderApi from "../../services/api/provider.service";
import MainLayout from "../templates/MainLayout";
import ProviderForm from "../organisms/forms/ProviderForm";
import Reload from "../molecules/Reload";
import { iProvider } from "../../functions/dataStructure";

const Providers = () => {
  const { currentTable, setCurrentTable, setIsLoading } = useTable();
  const { filterProps, setCount, setFilterCategories } = useFilter();
  const { showSnackbar } = useSnackbar();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentTable("providers");
    setFilterCategories(Object.values(iProvider));
  }, []);

  const [tableData, setTableData] = useState(null);

  const fetchData = async (props) => {
    setError(null);
    setIsLoading(true); // Establecer el estado de carga a verdadero
    try {
      const providers = await ProviderApi.getAllProviders(props);
      isFirstLoad &&
        (() => {
          showSnackbar(providers.message, "success");
          setIsFirstLoad(false);
        })();

      setTableData(providers.data);
      setCount(providers.largo);
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

  if (currentTable !== "providers") {
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
            <ProviderForm {...formProps} closeForm={() => setOpenForm(false)} />
          )}
        </>
      ) : (
        <Reload errorMessage={error} />
      )}
    </>
  );
};

export default Providers;

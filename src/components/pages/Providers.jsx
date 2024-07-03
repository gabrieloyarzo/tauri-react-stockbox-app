import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useSnackbar } from "../../context/SnackbarContext";
import ProviderApi from "../../services/api/provider.service";
import MainLayout from "../templates/MainLayout";
import ProviderForm from "../organisms/forms/ProviderForm";
import Reload from "../molecules/Reload";
import { iProvider } from "../../functions/dataStructure";

const Providers = () => {
  const { currentTable, setCurrentTable, setIsLoading, setTableColumns } =
    useTable();
  const { showSnackbar } = useSnackbar();

  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(
    localStorage.getItem("providers_page")
      ? Number(localStorage.getItem("providers_page"))
      : 1
  );

  // Filters
  const [filterProps, setFilterProps] = useState(
    JSON.parse(localStorage.getItem("providers_fprops")) ?? {
      offset: (page - 1) * 10,
    }
  );

  // Filters strings
  const filterStrings = Object.values(iProvider)
    .filter((item) => item[1] === "string")
    .map((item) => item[0]);

  // Filters numbers
  const filterNumbers = Object.values(iProvider)
    .filter((item) => item[1] === "number")
    .map((item) => item[0]);

  useEffect(() => {
    setTableColumns(Object.values(iProvider).map((item) => item[0]));
    setCurrentTable("providers");
  }, []);

  useEffect(() => {
    localStorage.setItem("providers_page", page);
    setFilterProps((prevProps) => ({
      ...prevProps,
      offset: (page - 1) * 10,
    }));
  }, [page]);

  const [tableData, setTableData] = useState(null);

  const fetchData = async (props) => {
    setError(null);
    setIsLoading(true);
    try {
      const providers = await ProviderApi.getAllProviders(props);
      isFirstLoad &&
        (() => {
          showSnackbar(providers.message, "success");
          setIsFirstLoad(false);
        })();

      setTableData(providers.data);
      setCount(providers.largo);

      localStorage.setItem("providers_fprops", JSON.stringify(filterProps));
    } catch (error) {
      setError(error.response.data.message);
      showSnackbar(error.response.data.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(filterProps);
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
            count={count}
            page={page}
            setPage={setPage}
            filterProps={filterProps}
            setFilterProps={setFilterProps}
            filterStrings={filterStrings}
            filterNumbers={filterNumbers}
          />
          {openForm && (
            <ProviderForm
              {...formProps}
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

export default Providers;

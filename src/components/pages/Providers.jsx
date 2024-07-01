import React, { useState, useEffect } from "react";
import { useTable } from "../../context/TableContext";
import { useFilter } from "../../context/FilterContext";
import ProviderApi from "../../services/api/provider.service";
import MainLayout from "../templates/MainLayout";
import ProviderForm from "../organisms/forms/ProviderForm";

const Providers = () => {
  const { currentTable, setCurrentTable, setIsLoading } = useTable();
  const { filterProps, setCount } = useFilter();

  const [tableData, setTableData] = useState(null);

  useEffect(() => {
    setCurrentTable("providers");
  }, []);

  const fetchData = async (props) => {
    setIsLoading(true); // Establecer el estado de carga a verdadero
    try {
      const providers = await ProviderApi.getAllProviders(props);

      setTableData(providers.data);
      setCount(providers.largo);
    } catch (error) {
      console.error(error);
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

  if (currentTable !== "providers") {
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
        <ProviderForm {...formProps} closeForm={() => setOpenForm(false)} />
      )}
    </>
  );
};

export default Providers;

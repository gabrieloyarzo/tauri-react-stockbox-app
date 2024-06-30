import React, { useState, useEffect, useContext } from "react";
import { TableContext } from "../../context/TableContext";
import { FilterContext } from "../../context/FilterContext";
import ProviderApi from "../../services/api/provider.service";
import MainLayout from "../templates/MainLayout";
import ProviderForm from "../organisms/forms/ProviderForm";

const Providers = () => {
  const { currentTable, setCurrentTable } = useContext(TableContext);
  const { filterProps } = useContext(FilterContext);

  const [tableData, setTableData] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCurrentTable("providers");
  }, []);

  // Loading state for table
  const [loading, setLoading] = useState(false);

  const fetchData = async (props) => {
    setLoading(true); // Establecer el estado de carga a verdadero
    try {
      const providers = await ProviderApi.getAllProviders(props);
      setTableData(providers.data);
      setCount(providers.largo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Establecer el estado de carga a falso
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
        count={count}
        loading={loading}
      />
      {openForm && (
        <ProviderForm
          {...formProps}
          closeForm={() => setOpenForm(false)}
        />
      )}
    </>
  );
};

export default Providers;

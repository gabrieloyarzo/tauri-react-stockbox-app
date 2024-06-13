import React, { useState } from "react";
import Table from "../organisms/Table";
import AddButton from "../molecules/AddButton";
import LoadingData from "../atoms/LoadingData";
import RenderForm from "../../functions/RenderForm";
import SkeletonTable from "../../components/molecules/SkeletonTable";

const MainLayout = ({
  currentTable,
  data,
  fetchData,
  products,
  productsCategories,
}) => {
  const [activeForm, setActiveForm] = useState(false);
  const [formProps, setFormProps] = useState({});

  const toggleForm = () => {
    setActiveForm(!activeForm);
  };

  return (
    <>
      {!data ? (
        <SkeletonTable />
      ) : (
        <>
          <Table
            currentTable={currentTable}
            data={data}
            fetchData={fetchData}
            toggleForm={toggleForm}
            setFormProps={setFormProps}
          />
          <AddButton
            currentTable={currentTable}
            fetchData={fetchData}
            toggleForm={toggleForm}
            setFormProps={setFormProps}
          />
        </>
      )}
      {activeForm && (
        <RenderForm
          currentTable={currentTable}
          formProps={{
            ...formProps,
            currentTable: currentTable,
            closeForm: toggleForm,
            products: products,
            categories: productsCategories,
          }}
        />
      )}
    </>
  );
};

export default MainLayout;

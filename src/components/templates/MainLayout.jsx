import React, { useState } from "react";
import Table from "../organisms/Table";
import AddButton from "../molecules/AddButton";
import LoadingData from "../atoms/LoadingData";
import RenderForm from "../../functions/renderForm";
import SkeletonTable from "../../components/molecules/SkeletonTable";

const MainLayout = ({
  currentTable,
  data,
  fetchData,
  setFormProps,
  toggleForm,
}) => {
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
    </>
  );
};

export default MainLayout;

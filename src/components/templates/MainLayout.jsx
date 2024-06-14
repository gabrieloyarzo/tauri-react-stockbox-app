import React, { useState } from "react";
import Table from "../organisms/Table";
import AddButton from "../molecules/AddButton";
import LoadingData from "../atoms/LoadingData";
import RenderForm from "../../functions/renderForm";
import SkeletonTable from "../../components/molecules/SkeletonTable";
import { Grid, Box } from "@mui/material";

const MainLayout = ({
  currentTable,
  data,
  fetchData,
  setFormProps,
  toggleForm,
}) => {
  return (
    <>
      <Grid item xs={10} md={9.25}>
        <Box
          position="relative"
          top="20%"
          width="100%"
        >
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
        </Box>
      </Grid>
    </>
  );
};

export default MainLayout;

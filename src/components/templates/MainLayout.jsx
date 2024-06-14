import React, { useState } from "react";
import Table from "../organisms/Table";
import AddButton from "../molecules/AddButton";
import LoadingData from "../atoms/LoadingData";
import RenderForm from "../../functions/renderForm";
import SkeletonTable from "../../components/molecules/SkeletonTable";
import { Grid, Box } from "@mui/material";
import Profile from "../organisms/Profile";

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
        <Grid container>
          <Grid item xs={12} md={12}>
            <Profile />
          </Grid>
          <Grid item xs={12} md={12}>
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
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MainLayout;

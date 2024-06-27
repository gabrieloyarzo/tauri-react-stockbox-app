import React, { useState } from "react";
import Table from "../organisms/Table";
import AddButton from "../molecules/AddButton";
import SkeletonTable from "../../components/molecules/SkeletonTable";
import { Grid, Box } from "@mui/material";
import Filters from "../organisms/Filters";
import Pagination from "../organisms/Pagination";

const MainLayout = ({
  currentTable,
  data,
  fetchData,
  setFormProps,
  toggleForm,
  filterProps,
  setFilterProps,
  count,
  loading,
  setLoading,
}) => {
  return (
    <>
      <Grid
        container
        direction="column"
        spacing="1rem"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} md={12}>
          <Filters />
        </Grid>
        <Grid item xs={12} md={12} style={{ flexGrow: 1 }}>
          <Box>
            {!data ? (
              <SkeletonTable />
            ) : (
              <>
                <Table
                  currentTable={currentTable}
                  data={data}
                  filterProps={filterProps}
                  fetchData={fetchData}
                  toggleForm={toggleForm}
                  setFormProps={setFormProps}
                  loading={loading}
                  setLoading={setLoading}
                />
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              height: "100%",
            }}
          >
            <Pagination setFilterProps={setFilterProps} count={count} />
          </Box>
        </Grid>
      </Grid>
      {data && (
        <AddButton
          currentTable={currentTable}
          fetchData={fetchData}
          toggleForm={toggleForm}
          setFormProps={setFormProps}
        />
      )}
    </>
  );
};

export default MainLayout;

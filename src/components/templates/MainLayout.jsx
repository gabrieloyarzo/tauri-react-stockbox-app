import React from "react";
import Table from "../organisms/Table";
import AddButton from "../molecules/AddButton";
import SkeletonTable from "../../components/molecules/SkeletonTable";
import SkeletonFilters from "../atoms/custom-ui/SkeletonFilters";
import { Grid, Box } from "@mui/material";
import Filters from "../organisms/Filters";
import Pagination from "../organisms/Pagination";

const MainLayout = ({
  data,
  fetchData,
  setFormProps,
  toggleForm,
  count,
  page,
  setPage,
  filterProps,
  setFilterProps,
  filterStrings,
  filterNumbers,
}) => {
  return (
    <>
      <Grid
        container
        direction="column"
        spacing="1rem"
        sx={{ minHeight: "90vh" }}
      >
        <Grid item xs={12} md={12}>
          {!data ? (
            <SkeletonFilters />
          ) : (
            <Filters
              filterProps={filterProps}
              setFilterProps={setFilterProps}
              filterStrings={filterStrings}
              filterNumbers={filterNumbers}
            />
          )}
        </Grid>
        <Grid item xs={12} md={12} style={{ flexGrow: 1 }}>
          <Box>
            {!data ? (
              <SkeletonTable />
            ) : (
              <>
                <Table
                  data={data}
                  fetchData={fetchData}
                  toggleForm={toggleForm}
                  setFormProps={setFormProps}
                  filterProps={filterProps}
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
            {data && <Pagination count={count} page={page} setPage={setPage} />}
          </Box>
        </Grid>
      </Grid>
      {data && (
        <AddButton
          fetchData={fetchData}
          toggleForm={toggleForm}
          setFormProps={setFormProps}
        />
      )}
    </>
  );
};

export default MainLayout;

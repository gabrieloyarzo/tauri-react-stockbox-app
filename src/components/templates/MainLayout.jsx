import React, { useState } from "react";
import Table from "../organisms/Table";
import AddButton from "../molecules/AddButton";
import SkeletonTable from "../../components/molecules/SkeletonTable";
import { Grid, Stack, Box } from "@mui/material";
import Profile from "../molecules/Profile";
import NotificationsPanel from "../organisms/NotificationPanel";
import Filters from "../organisms/Filters";
import Pagination from "../organisms/Pagination";

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
        <Grid
          container
          direction="column"
          spacing="1rem"
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={12} md={12}>
            <Stack
              direction="row"
              spacing={5}
              justifyContent="right"
              marginBottom=".5rem"
            >
              <NotificationsPanel />
              <Profile />
            </Stack>
          </Grid>
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
                    fetchData={fetchData}
                    toggleForm={toggleForm}
                    setFormProps={setFormProps}
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
                alignItems: "flex-end", // Align items to the end of the container
                minHeight: "100%", // Ensure it takes up the remaining space
              }}
            >
              <Pagination />
            </Box>
          </Grid>
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

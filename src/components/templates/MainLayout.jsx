import React, { useState } from "react";
import Table from "../organisms/Table";
import AddButton from "../molecules/AddButton";
import LoadingData from "../atoms/LoadingData";
import RenderForm from "../../functions/renderForm";
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
        <Grid container marginTop=".5em" justifyContent="center">
          <Stack spacing=".75rem" width="100%" marginRight=".5em">
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
            <Grid item xs={12} md={12}>
              <Box height="37.5rem">
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
              <Box display="flex" justifyContent="center">
                <Pagination />
              </Box>
            </Grid>
          </Stack>
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

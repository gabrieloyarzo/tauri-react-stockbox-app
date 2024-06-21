import React from "react";
import { Grid, Stack } from "@mui/material";
import Profile from "../molecules/Profile";
import NotificationsPanel from "../organisms/NotificationPanel";
import Cards from '../molecules/Cards';
import ChartPS from '../molecules/ChartPS'; 
import ChartSales from '../molecules/ChartSales'; 
import ChartTT from '../molecules/ChartTT'; 

const Dashboard = ({ data }) => {
  return (
    <Grid item xs={10} md={9.25}>
      <Grid container marginTop=".5em" justifyContent="center">
        <Grid item xs={12} width="95%">
          <Stack direction="row" spacing={5} justifyContent="flex-end">
            <NotificationsPanel />
            <Profile />
          </Stack>
        </Grid>
        <Grid item xs={12} marginTop="1.5em" width="95%">
          <Cards />
        </Grid>
        <Grid item xs={6} marginTop="1.5em" paddingRight=".5em">
          <ChartSales style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={6} marginTop="1em" paddingLeft=".5em">
          <ChartPS style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={6} paddingRight=".5em" marginTop="1.5em">
          <ChartSales style={{ width: "100%" }} />
        </Grid>
        <Grid item xs={6} paddingLeft=".5em" marginTop="1.5em">
          <ChartTT style={{ width: "100%" }} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;


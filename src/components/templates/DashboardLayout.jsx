import React from "react";
import { Grid, Stack, Box } from "@mui/material";
import Profile from "../molecules/Profile";
import NotificationsPanel from "../organisms/NotificationPanel";
import LoadingData from "../atoms/LoadingData";
import Cards from '../molecules/Cards';
import ChartPS from '../molecules/ChartPS'; 

const Dashboard = ({ data }) => {
  return (
    <Grid item xs={10} md={9.25}>
      <Grid container marginTop=".5em" justifyContent="center">
        <Box width="95%">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={5} justifyContent="flex-end">
                <NotificationsPanel />
                <Profile />
              </Stack>
            </Grid>
            <Grid item xs={12} marginTop="1em">
              <Box display="flex" justifyContent="center">
                <Cards />
              </Box>
            </Grid>
            <Grid item xs={12} marginTop="1em">
              <Box width="30%" display="flex" justifyContent="center">
                <ChartPS style={{ width: "100%" }} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;

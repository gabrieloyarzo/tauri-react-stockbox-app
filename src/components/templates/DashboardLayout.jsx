import React from "react";
import { Grid } from "@mui/material";
import Cards from "../molecules/Cards";
import ChartPS from "../molecules/ChartCO";
import ChartSales from "../molecules/ChartSales";
import ChartTT from "../molecules/ChartTT";
import ChartST from "../molecules/ChartST";

const Dashboard = ({ data }) => {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} marginTop="1.5em" width="95%">
        <Cards />
      </Grid>
      <Grid item xs={6.5} marginTop="1.5em" paddingRight=".5em">
        <ChartSales style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={5.5} marginTop="1em" paddingLeft=".5em">
        <ChartPS style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={7.1} marginTop="1.5em">
        <ChartST style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={4.9} marginTop="1.5em">
        <ChartTT style={{ width: "100%" }} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

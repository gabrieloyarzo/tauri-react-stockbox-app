import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  Purchases,
  Products,
  Providers,
  Sales,
  Users,
  ErrorScreen,
  Help,
} from "../components/pages";
import { Grid } from "@mui/material";
import Sidebar from "../components/organisms/Sidebar";
import HeaderLayout from "../components/templates/HeaderLayout";

const RouterApp = () => {
  return (
    <>
      <Grid container sx={{ minHeight: "98vh" }}>
        <Grid item xs={1} md={2.25}>
          <Sidebar />
        </Grid>
        <Grid item xs={11} md={9.75}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            paddingRight={1}
            paddingLeft={2}
          >
            <Grid item xs={12} md={12}>
              <HeaderLayout />
            </Grid>
            <Grid item xs={12} md={12}>
              <Routes>
                <Route path="/" element={<Navigate to="/analytics" />} />
                <Route path="/analytics" element={<Dashboard />} />
                <Route path="/purchases" element={<Purchases />} />
                <Route path="/products" element={<Products />} />
                <Route path="/providers" element={<Providers />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/users" element={<Users />} />
                <Route path="/help" element={<Help />} />
                <Route path="/*" element={<ErrorScreen />} />
              </Routes>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RouterApp;

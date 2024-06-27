import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  Purchases,
  Products,
  Providers,
  Users,
  ErrorScreen,
  Help,
} from "../pages";
import Sidebar from "../components/organisms/Sidebar";
import { Grid } from "@mui/material";

const RouterApp = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
        <Grid item xs={2} md={2.5}>
          <Sidebar />
        </Grid>
        <Grid item xs={10} md={9.5}>
          <Routes>
            <Route path="/" element={<Navigate to="/analytics" />} />
            <Route path="/analytics" element={<Dashboard />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/products" element={<Products />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/users" element={<Users />} />
            <Route path="/help" element={<Help />} />
            <Route path="/*" element={<ErrorScreen />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  );
};

export default RouterApp;

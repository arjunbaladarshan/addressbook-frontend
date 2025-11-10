import { Grid } from "@mui/material";
import React from "react";
import Menubar from "./Menubar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Grid container>
      <Grid size={12}>
        <Menubar />
      </Grid>

      <Grid size={2}>
        <Sidebar />
      </Grid>
      <Grid size={10}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default Layout;

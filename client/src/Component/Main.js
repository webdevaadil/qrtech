import React from "react";
import { Outlet } from "react-router-dom";
// import { Dashboardnav } from "./Dashboardnav";
import { Mainnav } from "./Mainnav.js";
export const Main = () => {
  return (
    <>
      <Mainnav />
      <Outlet />
    </>
  );
};

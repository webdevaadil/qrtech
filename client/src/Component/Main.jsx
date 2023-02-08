import React from "react";
import { Outlet } from "react-router-dom";
import { Dashboardnav } from "./Dashboardnav";
// import { Dashboardnav } from "./Dashboardnav";
import { Header } from "./Header";
import { Mainnav } from "./Mainnav";
import { Mainsidenav } from "./Mainsidenav";

export const Main = () => {
  return (
    <>
      <Mainnav />
      <Outlet />
    </>
  );
};

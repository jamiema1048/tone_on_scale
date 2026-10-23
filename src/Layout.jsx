import SiteNavigation from "./components/SiteNavigation";
import { Outlet } from "react-router-dom";
import React from "react";

const Layout = () => {
  return (
    <div>
      <SiteNavigation />
      <Outlet />
    </div>
  );
};

export default Layout;


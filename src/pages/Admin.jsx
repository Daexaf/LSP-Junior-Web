import React, { Fragment } from "react";
import DashboardAdmin from "../component/DashboardAdmin";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <Fragment>
      <DashboardAdmin />
    </Fragment>
  );
};

export default Admin;

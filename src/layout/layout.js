import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AsideNav from "../components/asideNav";
import MainNav from "../components/mainNav";
import GroupModal from "../components/modals/groupEditModal";
import ProductModal from "../components/modals/productEditModal";
import { fetchGroups } from "../store/actions";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://142.93.237.244:9090/v1/groups-by-filter")
      .then((response) => dispatch(fetchGroups(response.data)));
  }, []);
  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <AsideNav />
          <div className="layout-page">
            <MainNav />
            <main>{children}</main>
          </div>
        </div>
        <GroupModal />
        <ProductModal />
      </div>
    </>
  );
};

export default Layout;

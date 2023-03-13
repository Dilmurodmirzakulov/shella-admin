import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsideNav from "../components/asideNav";
import MainNav from "../components/mainNav";
import GroupModal from "../components/modals/groupCreateModal";
import GroupEditModal from "../components/modals/groupEditModal";
import ImageView from "../components/modals/ImageView";
import ProductModal from "../components/modals/productCreateModal";
import ProductEditModal from "../components/modals/productEditModal";
import Login from "../pages/login";
import { fetchGroups } from "../store/actions";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://142.93.237.244:9090/v1/groups-by-filter?all=true")
      .then((response) => dispatch(fetchGroups(response.data)))
      .catch((error) => console.log(error));
  }, []);

  const adminAuth = useSelector((state) => state.adminAuthReducer);
  return (
    <>
      {/* {!adminAuth ? (
        <Login />
      ) : ( */}
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
          <GroupEditModal />
          <ProductEditModal />
          <ImageView />
        </div>
      {/* )} */}
    </>
  );
};

export default Layout;

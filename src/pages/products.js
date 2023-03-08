import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, showGroup, showProduct } from "../store/actions";
import { BiEdit } from "react-icons/bi";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";
import { Table } from "react-bootstrap";
import axios from "axios";
import { AiOutlineDelete, AiOutlineFolderView } from "react-icons/ai";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        "http://142.93.237.244:9090/v1/products-by-filter?all=true&page=1&pageSize=20"
      )
      .then((response) => dispatch(fetchProducts(response.data)))
      .catch((error) => console.log(error));
  }, []);

  const productsObj = useSelector((state) => state.productsReducer);
  return (
    <div>
      <div className="content-wrapper">
        {/* <!-- Content --> */}

        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold py-3 mb-0">Products</h4>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                dispatch(showProduct());
              }}
            >
              Create product
            </button>
          </div>

          {/* <!-- Basic Bootstrap Table --> */}
          <div className="card">
            <h5 className="card-header">Products Table</h5>
            <div className="table-responsive text-nowrap">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th width="20%">Image</th>
                    <th width="20%">Name</th>
                    <th width="20%">URL</th>
                    <th width="10%">Position</th>
                    <th width="10%">Active</th>
                    <th width="20%">Actions</th>
                  </tr>
                </thead>
                {((productsObj || {}).products || []).length > 0 &&
                  productsObj.products.map((product) => {
                    return (
                      <tbody
                        className="table-border-bottom-0"
                        key={product.id + "product-table-row"}
                      >
                        <tr className="hover-grey">
                          <td className="table-img">
                            <img
                              className="img-fluid"
                              src={`http://142.93.237.244:9090/v1/public/products/${
                                (product.images[0] || {}).image ||
                                "no-image.jpg"
                              }`}
                              alt=""
                            />
                          </td>
                          <td>{product.nameUz}</td>
                          <td>{product.url}</td>
                          <td>
                            <span className="badge bg-label-primary me-1">
                              {product.position}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge bg-label-${
                                product.enabled ? "success" : "danger"
                              } me-1`}
                            >
                              {product.enabled ? "yes" : "no"}
                            </span>
                          </td>
                          <td>
                            <button
                              onClick={() => dispatch(showProduct(product))}
                              className="btn badge bg-label-info me-1"
                            >
                              <BiEdit className="regular-ic" />
                            </button>
                            <button className="btn badge bg-label-danger me-1">
                              <AiOutlineDelete className="regular-ic" />
                            </button>
                            <button className="btn badge bg-label-primary me-1">
                              <AiOutlineFolderView className="regular-ic" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </Table>
            </div>
          </div>
          {/* <!--/ Basic Bootstrap Table --> */}

          <hr className="my-5" />

          <ul className="pagination justify-content-center">
            <li className="page-item prev">
              <a className="page-link" href="#">
                <HiOutlineChevronDoubleLeft />
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                4
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                5
              </a>
            </li>
            <li className="page-item next">
              <a className="page-link" href="#">
                <HiOutlineChevronDoubleRight />
              </a>
            </li>
          </ul>

          <div className="content-backdrop fade"></div>
        </div>
      </div>
    </div>
  );
};

export default Products;

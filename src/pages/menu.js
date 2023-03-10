import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, showGroup } from "../store/actions";
import { FiChevronDown } from "react-icons/fi";
import axios from "axios";
import { Table, Button, Collapse } from "react-bootstrap";
import { useState } from "react";
const Menu = () => {
  const dispatch = useDispatch();
  const [openRowId, setOpenRowId] = useState(null);
  const groups = useSelector((state) => state.groupsReducer);
  return (
    <div>
      <div className="content-wrapper">
        {/* <!-- Content --> */}

        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold py-3 mb-0">Groups</h4>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                dispatch(showGroup(null));
              }}
            >
              Create group
            </button>
          </div>

          {/* <!-- Basic Bootstrap Table --> */}
          <div className="card">
            <h5 className="card-header">Table Basic</h5>
            <div className="table-responsive text-nowrap">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th width="20%">Image</th>
                    <th width="20%">Name</th>
                    <th width="20%">URL</th>
                    <th width="15%">Position</th>
                    <th width="15%">Active</th>
                    <th width="10%">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((group) => (
                    <React.Fragment key={group.id + "group-list-row"}>
                      <tr
                        onClick={() =>
                          setOpenRowId(openRowId === group.id ? null : group.id)
                        }
                        aria-controls={`collapse-row-${group.id}`}
                        aria-expanded={openRowId === group.id}
                      >
                        <td>
                          <div className="table-img">
                            <img
                              className="img-fluid"
                              src={`http://142.93.237.244:9090/v1/public/groups/${group.image}`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>{group.nameUz}</td>
                        <td>{group.url}</td>
                        <td>
                          <span className="badge bg-label-primary me-1">
                            {group.position}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge bg-label-${
                              group.enabled ? "success" : "danger"
                            } me-1`}
                          >
                            {group.enabled ? "yes" : "no"}
                          </span>
                        </td>
                        <td>
                          <Button
                            variant="info"
                            className="badge bg-label-info me-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              dispatch(showGroup(group));
                            }}
                          >
                            Edit
                          </Button>
                          <FiChevronDown
                            className={`${!group.child.length && "opacity-0"}`}
                          />
                        </td>
                      </tr>
                      {!!group.child.length && (
                        <tr>
                          <td colSpan={6} className="p-0">
                            <Collapse in={openRowId === group.id}>
                              <div id={`collapse-row-${group.id}`}>
                                <div className="table-responsive text-nowrap">
                                  <Table
                                    striped
                                    bordered
                                    hover
                                    variant="primary"
                                  >
                                    <tbody>
                                      {group.child.map((childGroup) => {
                                        return (
                                          <tr
                                            key={
                                              childGroup.id + "group-child-row"
                                            }
                                            aria-controls={`collapse-row-${childGroup.id}`}
                                            aria-expanded={
                                              openRowId === group.id
                                            }
                                          >
                                            <td width="20%">
                                              <div className="table-img">
                                                <img
                                                  className="img-fluid"
                                                  src={`http://142.93.237.244:9090/v1/public/groups/${childGroup.image}`}
                                                  alt=""
                                                />
                                              </div>
                                            </td>
                                            <td width="20%">
                                              {childGroup.nameUz}
                                            </td>
                                            <td width="20%">
                                              {childGroup.url}
                                            </td>
                                            <td width="15%">
                                              <span className="badge bg-label-primary me-1">
                                                {childGroup.position}
                                              </span>
                                            </td>
                                            <td width="15%">
                                              <span className="badge bg-label-success me-1">
                                                {childGroup.enabled
                                                  ? "yes"
                                                  : "no"}
                                              </span>
                                            </td>
                                            <td
                                              width="10%"
                                              className="border-end-0"
                                            >
                                              <Button
                                                variant="info"
                                                className="badge bg-label-info me-1"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  dispatch(
                                                    showGroup(childGroup)
                                                  );
                                                }}
                                              >
                                                Edit
                                              </Button>
                                              <FiChevronDown className="opacity-0" />
                                            </td>
                                          </tr>
                                        );
                                      })}
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </Collapse>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          {/* <!--/ Basic Bootstrap Table --> */}

          <hr className="my-5" />

          <div className="content-backdrop fade"></div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

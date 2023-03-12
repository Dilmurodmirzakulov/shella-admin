import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { showGroup, showGroupEdit } from "../store/actions";
import { FiChevronDown } from "react-icons/fi";
import { Table, Button, Collapse } from "react-bootstrap";
import { useState } from "react";
import { truncateString } from "../plugins/custom";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete, AiOutlineFolderView } from "react-icons/ai";
import axios from "axios";
const Menu = () => {
  const dispatch = useDispatch();
  const [openRowId, setOpenRowId] = useState(null);
  const groups = useSelector((state) => state.groupsReducer);

  const deleteGroup = (id) => {
    console.log("delete");
    axios
      .delete(`http://142.93.237.244:9090/v1/groups/${id}`)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="content-wrapper">
        {/* <!-- Content --> */}

        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="fw-bold py-3 mb-0">Groups</h4>
            <button
              className="btn btn-primary"
              onClick={() => dispatch(showGroup())}
            >
              Create group
            </button>
          </div>

          {/* <!-- Basic Bootstrap Table --> */}
          <div className="card">
            <h5 className="card-header">Table Basic</h5>
            <div className="table-responsive text-wrap">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th width="20%">Image</th>
                    <th width="20%">Name</th>
                    <th width="20%">Parent</th>
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
                              src={`http://142.93.237.244:9090/v1/public/groups/${
                                group.image || "no-image.jpg"
                              }`}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>{truncateString(group.nameUz, 50)}</td>
                        <td>{truncateString(group.parentGroup, 50)}</td>
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
                          <div className="d-flex flex-row">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(showGroupEdit(group));
                              }}
                              className="btn badge bg-label-info m-1"
                            >
                              <BiEdit className="regular-ic" />
                            </button>
                            <button
                              className="btn badge bg-label-danger m-1"
                              onClick={() => deleteGroup(group.id)}
                            >
                              <AiOutlineDelete className="regular-ic" />
                            </button>
                            <button className="btn badge bg-label-primary m-1">
                              <AiOutlineFolderView className="regular-ic" />
                            </button>
                          </div>
                          <FiChevronDown
                            className={`${
                              !group.child.length > 0 && "opacity-0"
                            }`}
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
                                              {truncateString(
                                                childGroup.nameUz,
                                                50
                                              )}
                                            </td>
                                            <td width="20%">
                                              {truncateString(
                                                childGroup.url,
                                                50
                                              )}
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
                                              <div className="d-flex flex-row">
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    dispatch(
                                                      showGroupEdit(childGroup)
                                                    );
                                                  }}
                                                  className="btn badge bg-label-info m-1"
                                                >
                                                  <BiEdit className="regular-ic" />
                                                </button>
                                                <button className="btn badge bg-label-danger m-1">
                                                  <AiOutlineDelete className="regular-ic" />
                                                </button>
                                                <button className="btn badge bg-label-primary m-1">
                                                  <AiOutlineFolderView className="regular-ic" />
                                                </button>
                                              </div>
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

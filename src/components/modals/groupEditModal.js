import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeGroup, closeGroupEdit } from "../../store/actions";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Collapse, ModalFooter } from "react-bootstrap";
import axios from "axios";
import { getGroupNameById } from "../../plugins/custom";
function GroupEditModal() {
  const dispatch = useDispatch();
  const { shownGroup } = useSelector((state) => state.modalsReducer);
  const { groupEditModal } = useSelector((state) => state.modalsReducer);
  const [open, setOpen] = useState(false);
  const groups = useSelector((state) => state.groupsReducer);
  const [done, setDone] = useState(null);

  const [groupData, setGroupData] = useState({
    nameUz: (shownGroup || {}).nameUz || "",
    nameRu: (shownGroup || {}).nameRu || "",
    nameEn: (shownGroup || {}).nameEn || "",
    descriptionUz: (shownGroup || {}).descriptionUz || "",
    descriptionRu: (shownGroup || {}).descriptionRu || "",
    descriptionEn: (shownGroup || {}).descriptionEn || "",
    position: (shownGroup || {}).position || 0,
    parentGroup: (shownGroup || {}).parentGroup || "0",
    fileImage: (shownGroup || {}).fileImage || "",
    seoDescription: (shownGroup || {}).seoDescription || "",
    seoKeywords: (shownGroup || {}).seoKeywords || "",
    seoText: (shownGroup || {}).seoText || "",
    seoTitle: (shownGroup || {}).seoTitle || "",
    enabled: (shownGroup || {}).enabled || true,
  });

  const hendleInput = (event) => {
    setGroupData({ ...groupData, [event.target.name]: event.target.value });
    if (event.target.name === "position") {
      setGroupData({
        ...groupData,
        position: parseInt(event.target.value),
      });
    }
    if (event.target.name === "enabled") {
      event.target.value === "true" &&
        setGroupData({ ...groupData, enabled: true });
      event.target.value === "false" &&
        setGroupData({ ...groupData, enabled: false });
    }
    if (event.target.name === "fileImage") {
      setGroupData({ ...groupData, fileImage: event.target.files[0] });
    }
  };

  const hendleSubmitData = (e) => {
    let formData = new FormData();
    !!groupData.nameUz && formData.append("nameUz", groupData.nameUz);
    !!groupData.nameRu && formData.append("nameRu", groupData.nameRu);
    !!groupData.nameEn && formData.append("nameEn", groupData.nameEn);
    !!groupData.descriptionUz &&
      formData.append("descriptionUz", groupData.descriptionUz);
    !!groupData.descriptionRu &&
      formData.append("descriptionRu", groupData.descriptionRu);
    !!groupData.descriptionEn &&
      formData.append("descriptionEn", groupData.descriptionEn);
    !!groupData.position && formData.append("position", groupData.position);
    !!groupData.parentGroup &&
      formData.append("parentGroup", groupData.parentGroup);
    !!groupData.fileImage && formData.append("fileImage", groupData.fileImage);
    !!groupData.seoDescription &&
      formData.append("seoDescription", groupData.seoDescription);
    !!groupData.seoKeywords &&
      formData.append("seoKeywords", groupData.seoKeywords);
    !!groupData.seoKeywords &&
      formData.append("seoText", groupData.seoKeywords);
    !!groupData.seoKeywords &&
      formData.append("seoTitle", groupData.seoKeywords);
    !!groupData.seoKeywords &&
      formData.append("enabled", groupData.seoKeywords);
    e.preventDefault();
    console.log(formData);
    axios
      .put(`http://142.93.237.244:9090/v1/groups/${shownGroup.id}`, formData)
      .then((response) => {
        setDone(response.data.id);
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  console.log(shownGroup);
  return (
    <>
      <Modal
        size="lg"
        show={groupEditModal}
        onHide={() => dispatch(closeGroupEdit())}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {!shownGroup ? "Create group" : "Edit group"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            {/* <div>
              <label className="mb-2 form-labe" htmlFor="group-url">
                URL
              </label>
              <input
                className="form-control"
                type="text"
                id="group-url"
                placeholder="url-product"
                defaultValue={(shownGroup || {}).url || ""}
                name="url"
                onChange={hendleInput}
              />
            </div>
            <hr className="my-4" /> */}
            <div>
              <p className="mb-2 form-labe">Parent group</p>
              <div className="row">
                <div className="col-12 col-md-6">
                  <select
                    className="form-control"
                    onChange={hendleInput}
                    name="parentGroup"
                    defaultValue={
                      (shownGroup || {}).parentGroup !== "0" &&
                      (shownGroup || {}).parentGroup
                    }
                  >
                    <option value="0">No parent</option>
                    {!!groups &&
                      groups.length > 0 &&
                      groups.map((group) => {
                        if (
                          (shownGroup || {}).parentGroup !== "0" &&
                          (shownGroup || {}).parentGroup === group.parentGroup
                        ) {
                          return (
                            <option
                              key={group.id + "select-option"}
                              value={group.id}
                            >
                              {group.nameUz}
                            </option>
                          );
                        }
                        if (group.parentGroup === "0") {
                          return (
                            <option
                              key={group.id + "select-option"}
                              value={group.id}
                            >
                              {group.nameUz}
                            </option>
                          );
                        }
                        return [];
                      })}
                  </select>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <label htmlFor="name-uz" className="mb-2 form-labe">
                Nomi
              </label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Gruppa nomi"
                defaultValue={(shownGroup || {}).nameUz || ""}
                name="nameUz"
                onChange={hendleInput}
              />
              <label htmlFor="description-uz" className="mb-2 form-labe">
                Tasnifi
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Gruppa tasnifi..."
                defaultValue={(shownGroup || {}).descriptionUz || ""}
                onChange={hendleInput}
                name="descriptionUz"
              />
            </div>
            <hr className="my-4" />
            <div>
              <label htmlFor="name-ru" className="mb-2 form-labe">
                Название
              </label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Group name"
                defaultValue={(shownGroup || {}).nameRu || ""}
                onChange={hendleInput}
                name="nameRu"
              />
              <label htmlFor="description-ru" className="mb-2 form-labe">
                Описание
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Group description..."
                defaultValue={(shownGroup || {}).descriptionRu || ""}
                onChange={hendleInput}
                name="descriptionRu"
              />
            </div>
            <hr className="my-4" />
            <div>
              <label htmlFor="name-eu" className="mb-2 form-labe">
                Name
              </label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Group name"
                defaultValue={(shownGroup || {}).nameEu || ""}
                onChange={hendleInput}
                name="nameEn"
              />
              <label htmlFor="description-eu" className="mb-2 form-labe">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Group description..."
                defaultValue={(shownGroup || {}).descriptionEu || ""}
                onChange={hendleInput}
                name="descriptionEn"
              />
            </div>
            <hr className="my-4" />
            <div>
              <label htmlFor="group-position" className="mb-2 form-labe">
                Position
              </label>
              <input
                type="number"
                id="group-position"
                className="form-control"
                placeholder="Group position"
                defaultValue={(shownGroup || {}).position || ""}
                onChange={hendleInput}
                name="position"
              />
            </div>
            <hr className="my-4" />
            <div>
              <p className="mb-2 form-labe">Group status</p>
              <input
                type="radio"
                name="enabled"
                id="group-enabled"
                className="form-check-input"
                // defaultValue={(shownGroup || {}).enabled || ""}
                // checked
                // value={shownGroup.enabled}
                defaultChecked={(shownGroup || {}).enabled ? true : false}
                value={true}
                onChange={hendleInput}
              />
              <label
                htmlFor="group-enabled"
                className="mb-2 ms-2 me-5 form-check-label"
              >
                Enabled
              </label>
              <input
                type="radio"
                name="enabled"
                id="group-disabled"
                className="form-check-input"
                defaultChecked={!(shownGroup || {}).enabled ? true : false}
                value={false}
                onChange={hendleInput}
              />
              <label
                htmlFor="group-disabled"
                className="mb-2 ms-2 form-check-label"
              >
                Disabled
              </label>
            </div>
            <hr className="my-4" />
            <div>
              <Button
                onClick={() => setOpen(!open)}
                aria-controls="seo-collapse"
                aria-expanded={open}
              >
                {!open ? "Add SEO" : "Close SEO"}
              </Button>
              <Collapse in={open}>
                <div id="seo-collapse">
                  <label htmlFor="name-eu" className="mb-2 mt-4 form-labe">
                    SEO Title
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="SEO title"
                    defaultValue={(shownGroup || {}).seoTitle || ""}
                    name="seoTitle"
                    onChange={(e) => hendleInput(e)}
                  />
                  <label htmlFor="name-eu" className="mb-2 form-labe">
                    SEO Text
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="SEO name"
                    defaultValue={(shownGroup || {}).seoText || ""}
                    name="seoText"
                    onChange={(e) => hendleInput(e)}
                  />
                  <label htmlFor="name-eu" className="mb-2 form-labe">
                    SEO Keywords
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="SEO keywords"
                    defaultValue={(shownGroup || {}).seoKeywords || ""}
                    name="seoKeywords"
                    onChange={(e) => hendleInput(e)}
                  />
                  <label htmlFor="description-eu" className="mb-2 form-labe">
                    SEO Description
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="SEO description..."
                    defaultValue={(shownGroup || {}).seoDescription || ""}
                    name="seoDescription"
                    onChange={(e) => hendleInput(e)}
                  />
                </div>
              </Collapse>
            </div>
            <div>
              <hr className="my-4" />
              {!!shownGroup && !!(shownGroup || {}).image ? (
                <div className="shown-group-image">
                  <img
                    className="img-fluid"
                    src={`http://142.93.237.244:9090/v1/public/groups/${shownGroup.image}`}
                    alt=""
                  />
                  <button className="btn bg-label-danger delete-btn">
                    <AiOutlineDelete />
                  </button>
                  <button className="btn bg-label-info view-btn">
                    <AiOutlineEye />
                  </button>
                </div>
              ) : (
                <>
                  <label htmlFor="group-image" className="mb-2 form-labe">
                    Group image
                  </label>
                  <input
                    type="file"
                    id="group-image"
                    name="fileImage"
                    className="form-control"
                    placeholder="Group image"
                    onChange={hendleInput}
                  />
                </>
              )}
            </div>
            <ModalFooter>
              {!!done && (
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={() => dispatch(closeGroup())}
                >
                  Finish
                </button>
              )}
              {!done && (
                <>
                  <button className="btn btn-default" type="reset">
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={hendleSubmitData}
                  >
                    Confirm
                  </button>
                </>
              )}
            </ModalFooter>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GroupEditModal;

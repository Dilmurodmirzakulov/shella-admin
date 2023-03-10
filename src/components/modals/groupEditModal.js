import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeGroup } from "../../store/actions";
// import Form from "react-bootstrap/Form";
import { Collapse, ModalFooter } from "react-bootstrap";
import axios from "axios";
function GroupModal() {
  const dispatch = useDispatch();
  const { shownGroup } = useSelector((state) => state.modalsReducer);
  const { groupModal } = useSelector((state) => state.modalsReducer);
  const [open, setOpen] = useState(false);
  const groups = useSelector((state) => state.groupsReducer);
  const [groupValue, setGroupValue] = useState(null);
  const [createdGroup, setCreatedGroup] = useState(null);
  // const [grImage, setGrImage] = useState(null);
  // const [createdImage, setCreatedImage] = useState(null);

  console.log(groups);
  const [groupData, setGroupData] = useState({
    // id: "864f6ec8-536b-43c4-803a-d6e51b288ec2",
    // url: "test",
    nameUz: "",
    nameRu: "",
    nameEn: "",
    descriptionUz: "",
    descriptionRu: "",
    descriptionEn: "",
    position: null,
    parentGroup: "0",
    image: "",
    seoDescription: "",
    seoKeywords: "",
    seoText: "",
    seoTitle: "",
    enabled: true,
    // createdAt: "2023-03-09 22:09:11",
    // updatedAt: "",
    // deletedAt: "",
  });

  // console.log("groupData", groupData);

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
    if (event.target.name === "image") {
      const formData = new FormData();
      formData.append("fileImage", event.target.value);
      setGroupData({ ...groupData, image: formData });
    }
  };

  const getGroupValue = (event) => {
    setGroupData({ ...groupData, groupId: event.target.value });
    setGroupValue(event.target.value);
  };

  const getChildGroupValue = (event) => {
    setGroupData({ ...groupData, groupId: event.target.value });
  };

  let selectedGroup = null;
  if (!!groupValue) {
    selectedGroup = groups.find((x) => x.id === groupValue);
  }

  const hendleSubmitData = (e) => {
    e.preventDefault();
    axios
      .post("http://142.93.237.244:9090/v1/groups", groupData)
      .then((response) => setCreatedGroup(response.data.id))
      .catch((error) => console.log(error));
  };

  // console.log("createdGroup", createdGroup);
  return (
    <>
      <Modal
        size="lg"
        show={groupModal}
        onHide={() => dispatch(closeGroup())}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {!shownGroup ? "Create group" : "Edit group"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
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
            <hr className="my-4" />
            <div>
              <p className="mb-2 form-labe">Parent group</p>
              <div className="row">
                <div className="col-12 col-md-6">
                  <select
                    className="form-control"
                    onChange={hendleInput}
                    name="parentGroup"
                  >
                    <option value="0">No parent</option>
                    {!!groups &&
                      groups.length > 0 &&
                      groups.map((group) => {
                        return (
                          <option
                            key={group.id + "select-option"}
                            value={group.id}
                          >
                            {group.nameUz}
                          </option>
                        );
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
                // value={shownGroup.nameUz}
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
                // value={shownGroup.descriptionUz}
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
                // value={shownGroup.nameRu}
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
                // value={shownGroup.descriptionRu}
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
                // value={shownGroup.nameEu}
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
                // value={shownGroup.descriptionEu}
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
                // value={shownGroup.position}
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
                // value={shownGroup.enabled}
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
                Add SEO
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
                    // defaultValue={(shownProduct || {}).nameEu || ""}
                    // value={nameEn}
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
                    // defaultValue={(shownProduct || {}).nameEu || ""}
                    // value={nameEn}
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
                    // defaultValue={(shownProduct || {}).nameEu || ""}
                    // value={nameEn}
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
                    // defaultValue={(shownProduct || {}).descriptionEu || ""}
                    // value={descriptionEn}
                    name="seoDescription"
                    onChange={(e) => hendleInput(e)}
                  />
                </div>
              </Collapse>
            </div>
            <div>
              <hr className="my-4" />

              <label htmlFor="group-image" className="mb-2 form-labe">
                Group image
              </label>
              <input
                type="file"
                id="group-image"
                name="image"
                className="form-control"
                placeholder="Group image"
                onChange={hendleInput}
              />
            </div>
            <ModalFooter>
              {!!createdGroup && (
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={() => dispatch(closeGroup())}
                >
                  Finish
                </button>
              )}
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
            </ModalFooter>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GroupModal;

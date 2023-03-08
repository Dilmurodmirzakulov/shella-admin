import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeGroup } from "../../store/actions";
import Form from "react-bootstrap/Form";
import { ModalFooter } from "react-bootstrap";
function GroupModal() {
  const dispatch = useDispatch();
  const { shownGroup } = useSelector((state) => state.modalsReducer);
  const { groupModal } = useSelector((state) => state.modalsReducer);
  const groups = useSelector((state) => state.groupsReducer);
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
              />
            </div>
            <hr className="my-4" />
            <div>
              <p className="mb-2 form-labe">Parent group</p>
              <div className="row">
                <div className="col-12 col-md-6">
                  <select className="form-control">
                    <option value="no">No parent</option>
                    {groups.length > 0 &&
                      groups.map((x) => {
                        if (
                          shownGroup != null &&
                          shownGroup.parentGroup != "0" &&
                          x.id == shownGroup.parentGroup
                        ) {
                          return (
                            <option
                              defaultValue={x.value}
                              key={x.id + "hasParent"}
                              selected
                            >
                              {x.nameUz}
                            </option>
                          );
                        }
                        return (
                          <option
                            defaultValue={x.value}
                            key={x.id + "hasParent"}
                          >
                            {x.nameUz}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <input
                    className="form-control"
                    type="text"
                    id="group-url"
                    placeholder="Parent group"
                    defaultValue={(shownGroup || {}).url || ""}
                    // value={shownGroup.url || ""}
                  />
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
              />
            </div>
            <hr className="my-4" />
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
            />
            <hr className="my-4" />
            <label htmlFor="group-image" className="mb-2 form-labe">
              Group image
            </label>
            <input
              type="file"
              id="group-image"
              className="form-control"
              placeholder="Group image"
              // value={`http://142.93.237.244:9090/v1/public/${shownGroup.image}`}
            />
            <hr className="my-4" />
            <p className="mb-2 form-labe">Group status</p>
            <input
              type="radio"
              name="group-status"
              id="group-enabled"
              className="form-check-input"
              // defaultValue={(shownGroup || {}).enabled || ""}
              // checked
              // value={shownGroup.enabled}
            />
            <label
              htmlFor="group-enabled"
              className="mb-2 ms-2 me-5 form-check-label"
            >
              Enabled
            </label>
            <input
              type="radio"
              name="group-status"
              id="group-disabled"
              className="form-check-input"
              // value={shownGroup.enabled}
            />
            <label
              htmlFor="group-disabled"
              className="mb-2 ms-2 form-check-label"
            >
              Disabled
            </label>
            <hr className="my-4" />
            <ModalFooter>
              <button className="btn btn-default" type="reset">
                Cancel
              </button>
              <button className="btn btn-primary" type="submit">
                Confirm
              </button>
            </ModalFooter>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GroupModal;

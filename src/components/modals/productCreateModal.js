import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeProduct } from "../../store/actions";
import Collapse from "react-bootstrap/Collapse";
import { ModalFooter } from "react-bootstrap";
import axios from "axios";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
function ProductModal() {
  const [prImage, setPrImage] = useState(null);
  const [groupValue, setGroupValue] = useState(null);
  const [createdImage, setCreatedImage] = useState();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { shownProduct } = useSelector((state) => state.modalsReducer);
  const { productModal } = useSelector((state) => state.modalsReducer);
  const [createdProduct, setCreatedProduct] = useState(null);
  const groups = useSelector((state) => state.groupsReducer);

  const [productData, setProductData] = useState({
    url: "",
    price: "",
    seoDescription: "",
    seoKeywords: "",
    seoText: "",
    seoTitle: "",
    enabled: "",
    nameRu: "",
    nameEn: "",
    descriptionUz: "",
    descriptionRu: "",
    descriptionEn: "",
    position: 0,
    groupId: "",
  });

  const hendleInput = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
    if (event.target.name === "price") {
      setProductData({ ...productData, price: parseInt(event.target.value) });
    }
    if (event.target.name === "position") {
      setProductData({
        ...productData,
        position: parseInt(event.target.value),
      });
    }
    if (event.target.name === "enabled") {
      event.target.value === "true" &&
        setProductData({ ...productData, enabled: true });
      event.target.value === "false" &&
        setProductData({ ...productData, enabled: false });
    }
  };

  const hendleSubmitData = (e) => {
    e.preventDefault();
    axios
      .post("http://142.93.237.244:9090/v1/products", productData)
      .then((response) => setCreatedProduct(response.data.id))
      .catch((error) => console.log(error));
  };

  const getImage = (event) => {
    const file = event.target.files[0];
    setPrImage(file);
  };

  const uploadImage = (imageFile, productId) => {
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("fileImage", imageFile);

    axios
      .post("http://142.93.237.244:9090/v1/product-images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Success", response);
        setCreatedImage((x) =>
          !!x ? [...x, response.data.image] : [response.data.image]
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getGroupValue = (event) => {
    setProductData({ ...productData, groupId: event.target.value });
    setGroupValue(event.target.value);
  };

  const getChildGroupValue = (event) => {
    setProductData({ ...productData, groupId: event.target.value });
  };

  let selectedGroup = null;
  if (!!groupValue) {
    selectedGroup = groups.find((x) => x.id === groupValue);
  }
  return (
    <>
      <Modal
        size="lg"
        show={productModal}
        onHide={() => dispatch(closeProduct())}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {!shownProduct ? "Create product" : "Edit product"}
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
                name="url"
                placeholder="url-product"
                onLoad={hendleInput}
                onChange={(e) => hendleInput(e)}
              />
            </div>
            <hr className="my-4" />
            <div>
              <p className="mb-2 form-labe">Product Group</p>
              <div className="row">
                <div className="col-12 col-md-6">
                  <select className="form-control" onChange={getGroupValue}>
                    <option value="DEFAULT" disabled>
                      Select Group
                    </option>
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
                {selectedGroup && selectedGroup.child.length > 0 && (
                  <div className="col-12 col-md-6">
                    <select
                      className="form-control"
                      onChange={getChildGroupValue}
                    >
                      <option value="DEFAULT2" disabled>
                        Select Group
                      </option>
                      {selectedGroup.child.length > 0 &&
                        selectedGroup.child.map((child) => {
                          return (
                            <option
                              key={child.id + "select-option"}
                              value={child.id}
                            >
                              {child.nameUz}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                )}
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
                placeholder="Maxsulot nomi"
                name="nameUz"
                onLoad={hendleInput}
                onChange={(e) => hendleInput(e)}
              />
              <label htmlFor="description-uz" className="mb-2 form-labe">
                Tasnifi
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Maxsulot tasnifi..."
                name="descriptionUz"
                onChange={(e) => hendleInput(e)}
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
                placeholder="Product name"
                name="nameRu"
                onChange={(e) => hendleInput(e)}
              />
              <label htmlFor="description-ru" className="mb-2 form-labe">
                Описание
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Product description..."
                name="descriptionRu"
                onChange={(e) => hendleInput(e)}
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
                placeholder="Product name"
                name="nameEn"
                onChange={(e) => hendleInput(e)}
              />
              <label htmlFor="description-eu" className="mb-2 form-labe">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Product description..."
                name="descriptionEn"
                onChange={(e) => hendleInput(e)}
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
                name="position"
                onChange={(e) => hendleInput(e)}
              />
            </div>
            <hr className="my-4" />
            <div>
              <label htmlFor="product-price" className="mb-2 form-labe">
                price
              </label>
              <input
                type="number"
                id="product-price"
                className="form-control"
                placeholder="Product price"
                name="price"
                onChange={(e) => hendleInput(e)}
              />
            </div>
            <hr className="my-4" />
            <div>
              <p className="mb-2 form-labe">Product status</p>
              <input
                type="radio"
                name="enabled"
                id="product-enabled"
                className="form-check-input"
                value={true}
                onChange={hendleInput}
              />
              <label
                htmlFor="product-enabled"
                className="mb-2 ms-2 me-5 form-check-label"
              >
                Enabled
              </label>
              <input
                type="radio"
                name="enabled"
                id="product-disabled"
                className="form-check-input"
                value={false}
                onChange={hendleInput}
              />
              <label
                htmlFor="product-disabled"
                className="mb-2 ms-2 form-check-label"
              >
                Disabled
              </label>
            </div>
            <hr className="my-4" />

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

            {(!!createdProduct || !!shownProduct) && (
              <div>
                l
                <hr className="my-4" />
                <label htmlFor="group-image" className="mb-2 form-labe">
                  Product image
                </label>
                <input
                  type="file"
                  id="group-image"
                  className="form-control"
                  placeholder="Group image"
                  onChange={getImage}
                />
                {!!shownProduct && !!(shownProduct || {}).images.length > 0 && (
                  <div className="d-flex">
                    {shownProduct.images.map((image) => {
                      return (
                        <div
                          className="shown-group-image me-3"
                          key={
                            image +
                            `${createdProduct || shownProduct.id || "55"}`
                          }
                        >
                          <img
                            className="img-fluid"
                            src={`http://142.93.237.244:9090/v1/public/groups/${image.image}`}
                            alt=""
                          />
                          <button className="btn bg-label-danger delete-btn">
                            <AiOutlineDelete />
                          </button>
                          <button className="btn bg-label-info view-btn">
                            <AiOutlineEye />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                {!!createdImage && createdImage.length > 0 && (
                  <div className="d-flex mr-3">
                    {createdImage.map((image) => {
                      return (
                        <div className="shown-group-image me-3">
                          <img
                            className="img-fluid"
                            src={`http://142.93.237.244:9090/v1/public/products/${image}`}
                            alt=""
                          />
                          <button className="btn bg-label-danger delete-btn">
                            <AiOutlineDelete />
                          </button>
                          <button className="btn bg-label-info view-btn">
                            <AiOutlineEye />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
                {!!prImage && !!createdProduct && (
                  <button
                    className="btn btn-primary mt-4"
                    type="button"
                    onClick={() => uploadImage(prImage, createdProduct)}
                  >
                    Upload image
                  </button>
                )}
              </div>
            )}
            <hr className="my-4" />
            <ModalFooter>
              {!!createdProduct && !!createdImage && (
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={() => dispatch(closeProduct())}
                >
                  Finish
                </button>
              )}
              {!createdProduct && (
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

export default ProductModal;

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeImage } from "../../store/actions";

export default function ImageView() {
  const { imageModal } = useSelector((state) => state.modalsReducer);
  const { shownImage } = useSelector((state) => state.modalsReducer);
  const dispatch = useDispatch();
  return (
    <Modal
      show={imageModal}
      onHide={() => dispatch(closeImage())}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={shownImage} width="300px" height="300px" style={{objectFit: "contain" ,display: 'block', margin: "auto"}} alt="" />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

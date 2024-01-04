import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { crossButton } from "../lib/icon";
import Icon from "./Icon";

export default function ModalShow({
  handleView,
  handleApi,
  handleClose,
  title,
  title1,
  title2,
  cancelBtn,
  customComponent,
  size,
  className,

}: any) {
  return (
    <Modal
      show={handleView}
      className={className}
      onHide={() => handleClose()}
      size={size ? size : "md"}

      centered
    >
      <div className="p-3 d-flex justify-content-between">

        <Modal.Title>{title}</Modal.Title>
        <Icon
          icon={crossButton}
          action={
            handleClose
          }
  
        />
      </div>
      <Modal.Body className="p-3">{title1}</Modal.Body>
      <div className="justify-content-end p-3">
        {title2 ? (
          <Button onClick={() => handleApi()} className="btn-submit" >{title2}</Button>
        ) : (
          customComponent
        )}
        {cancelBtn && (
          <Button onClick={() => handleClose()} variant={cancelBtn ? "outline-primary" : "primary"}>
            {cancelBtn ? cancelBtn : "Cancel"}
          </Button>
        )}
      </div>
    </Modal>
  );
}

import React from "react";
import { SharedError } from "../shared";
import { Button, Modal } from "react-bootstrap";
import CustomerForm from "./CustomerForm";

export default function CustomerOptionForm({
  onHide,
  show,
  error,
  object,
  onChange,
  onSave,
  title,
}) {
  return (
    <React.Fragment>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SharedError error={error} />
          <CustomerForm error={error} object={object} onChange={onChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onSave} variant="dark">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

import React from "react";
import { SharedError, SharedPagination, SharedSearch } from "../shared";
import CustomerList from "./CustomerList";
import { Button, Modal } from "react-bootstrap";

export default function CustomerOptionList({
  onHide,
  show,
  onGets,
  collection,
  onSelect,
  pagination,
  error,
  title,
}) {
  return (
    <React.Fragment>
      <Modal fullscreen show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SharedError error={error} />
          <SharedSearch onGets={onGets} />
        </Modal.Body>
        <CustomerList collection={collection}>
          {(value) => (
            <Button variant="dark" onClick={() => onSelect(value)}>
              Select
            </Button>
          )}
        </CustomerList>
        <Modal.Footer>
          <SharedPagination onGets={onGets} pagination={pagination} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

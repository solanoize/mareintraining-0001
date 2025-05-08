import React from "react";
import { SharedError, SharedPagination, SharedSearch } from "../shared";
import ProductList from "./ProductList";
import { Button, Modal } from "react-bootstrap";

export default function ProductOptionList({
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
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SharedError error={error} />
          <SharedSearch onGets={onGets} />
        </Modal.Body>
        <ProductList collection={collection}>
          {(value) => (
            <Button variant="dark" onClick={() => onSelect(value)}>
              Select
            </Button>
          )}
        </ProductList>
        <Modal.Footer>
          <SharedPagination onGets={onGets} pagination={pagination} />
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

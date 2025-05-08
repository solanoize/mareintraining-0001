import React from "react";
import {
  SharedError,
  SharedModal,
  SharedPagination,
  SharedSearch,
} from "../shared";
import { CategoryList } from ".";
import { Modal } from "react-bootstrap";

export default function CategoryOptionList({
  onClose,
  show,
  onGets,
  collection,
  onSelect,
  pagination,
  error,
}) {
  return (
    <React.Fragment>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Categories</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <SharedError error={error} />
          <SharedSearch onGets={onGets} />
        </Modal.Body>
      </Modal>
      <SharedModal size="lg" onClose={onClose} show={show}>
        <SharedModal.Title>Category Options</SharedModal.Title>
        <SharedModal.Body>
          <SharedError error={error} />
          <SharedSearch onGets={onGets} />
        </SharedModal.Body>
        <SharedModal.OuterBody>
          <CategoryList collection={collection} onSelect={onSelect} />
        </SharedModal.OuterBody>
        <SharedModal.Footer>
          <SharedPagination onGets={onGets} pagination={pagination} />
        </SharedModal.Footer>
      </SharedModal>
    </React.Fragment>
  );
}

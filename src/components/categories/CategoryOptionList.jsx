import React from "react";
import {
  SharedError,
  SharedModal,
  SharedPagination,
  SharedSearch,
} from "../shared";
import { CategoryList } from ".";

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

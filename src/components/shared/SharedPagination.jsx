import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function SharedPagination({ pagination, count, label, onGets }) {
  const onPrevious = () => {
    onGets(pagination?.previous);
  };

  const onNext = () => {
    onGets(pagination?.next);
  };

  return (
    <React.Fragment>
      <ButtonGroup>
        <Button
          variant="dark"
          disabled={!pagination.previous}
          onClick={onPrevious}
        >
          <FaArrowLeft />
        </Button>
        <Button variant="dark" disabled={!pagination.next} onClick={onNext}>
          <FaArrowRight />
        </Button>
      </ButtonGroup>
      {count && label && (
        <span className="ms-3">
          {count} {label ?? "Data"}
        </span>
      )}
    </React.Fragment>
  );
}

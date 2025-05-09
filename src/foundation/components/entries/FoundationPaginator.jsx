import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function FoundationPaginator({ onList, pagination }) {
  const onPrevious = () => {
    onList(pagination?.previous);
  };

  const onNext = () => {
    onList(pagination?.next);
  };

  return (
    <React.Fragment>
      <ButtonGroup>
        <Button disabled={!pagination?.previous} onClick={onPrevious}>
          <FaArrowLeft /> Previous
        </Button>
        <Button disabled={!pagination?.next} onClick={onNext}>
          Next <FaArrowRight />
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
}

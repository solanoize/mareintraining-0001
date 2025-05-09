import React from "react";
import { ListGroup } from "react-bootstrap";
import { FoundationDetailError, FoundationNonFieldError } from "../errors";

export default function FoundationListEntries({
  reader,
  title,
  subtitle,
  pill,
  variant = "",
}) {
  return (
    <React.Fragment>
      <FoundationDetailError {...reader} />
      <FoundationNonFieldError {...reader} />
      <ListGroup variant={variant}>
        {!reader?.isEmptyCollection &&
          reader?.collection?.map((value) => (
            <ListGroup.Item
              key={value?.id}
              action
              active={reader?.object?.id === value?.id}
              onClick={() => reader?.onSelectObject(value)}
              className="d-flex justify-content-between align-items-start"
            >
              <div className="me-auto">
                <div className="fw-bold mb-1">{title(value)}</div>
                <small>{subtitle && subtitle(value)}</small>
              </div>
              <small>{pill && pill(value)}</small>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </React.Fragment>
  );
}

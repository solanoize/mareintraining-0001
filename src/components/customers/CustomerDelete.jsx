import React from "react";
import { Badge } from "react-bootstrap";

export default function CustomerDelete({ object }) {
  return (
    <React.Fragment>
      Are you sure you want to delete this{" "}
      <Badge bg="danger">{object?.name}</Badge> ?
    </React.Fragment>
  );
}

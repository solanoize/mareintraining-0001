import React from "react";
import { Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

export default function FoundationDetailError({ error }) {
  return (
    error?.data?.detail && (
      <React.Fragment>
        <Alert variant="warning" dismissible className="text-danger">
          <Alert.Heading>{error?.message}</Alert.Heading>
          <FaInfoCircle /> {error?.data?.detail}
        </Alert>
      </React.Fragment>
    )
  );
}

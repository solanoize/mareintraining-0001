import React from "react";
import { Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

export default function FoundationNonFieldError({ error }) {
  return (
    error?.data?.non_field_errors && (
      <React.Fragment>
        <Alert variant="warning" className="text-danger">
          <Alert.Heading>{error?.message}</Alert.Heading>
          <ul>
            {error?.data?.non_field_errors?.map((message, index) => (
              <li key={index}>
                <FaInfoCircle /> {message}
              </li>
            ))}
          </ul>
        </Alert>
      </React.Fragment>
    )
  );
}

import React from "react";
import { Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

export default function SharedNonFieldValidation({ error }) {
  return (
    <React.Fragment>
      {error?.data?.non_field_errors && (
        <Alert variant="warning" className="pb-0">
          <ul className="list-unstyled">
            {error?.data?.non_field_errors?.map((message, index) => (
              <li className="text-danger" key={index}>
                <FaInfoCircle /> {message}
              </li>
            ))}
          </ul>
        </Alert>
      )}
    </React.Fragment>
  );
}

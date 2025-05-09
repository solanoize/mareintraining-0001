import React from "react";
import { Badge, Form } from "react-bootstrap";
import { FaInfo, FaInfoCircle } from "react-icons/fa";

export default function FoundationValidationError({ error, field }) {
  return (
    <React.Fragment>
      <Form.Text className="text-danger">
        <ul className="list-unstyled mt-2">
          {error?.data?.[field]?.map((message, value) => (
            <li key={value} data-test={field + "-error-message"}>
              <FaInfoCircle /> {message}
            </li>
          ))}
        </ul>
      </Form.Text>
    </React.Fragment>
  );
}

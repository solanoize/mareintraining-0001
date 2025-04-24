import React from "react";
import { Form } from "react-bootstrap";

export default function SharedFieldValidation({ error, field }) {
  return (
    <React.Fragment>
      {error?.data?.[field] && (
        <Form.Text className="text-danger">{error?.data?.[field]}</Form.Text>
      )}
    </React.Fragment>
  );
}

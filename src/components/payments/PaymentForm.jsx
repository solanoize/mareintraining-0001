import { NumberBox, TextBox } from "devextreme-react";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { getFieldError } from "../../foundation/services";

export default function PaymentForm({ object, onValueChange, error }) {
  return (
    <React.Fragment>
      <NumberBox
        mode="number"
        label="Amount"
        min={0}
        max={1000000000}
        // format={"currency"}
        labelMode="floating"
        onValueChange={(value) => onValueChange(value, "amount")}
        value={object?.amount || 0}
        validationError={{ message: getFieldError(error, "amount") }}
      />
      {getFieldError(error, "amount")}
    </React.Fragment>
  );
}

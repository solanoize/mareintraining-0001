import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { SharedError } from "../shared";

function InvoiceNumberField({ object, error, onChange }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Invoice Number</Form.Label>
      <Form.Control
        name="invoice_number"
        type="text"
        value={object?.invoice_number || ""}
        onChange={onChange}
      />
      <SharedError error={error} field={"invoice_number"} />
    </Form.Group>
  );
}

function CustomerField({ object, error, children }) {
  return (
    <Form.Group>
      <Form.Label>Customer</Form.Label>
      <InputGroup>
        <Form.Control readOnly placeholder={object?.customer?.name || ""} />
        {children}
      </InputGroup>
      <SharedError error={error} field={"customer"} />
    </Form.Group>
  );
}

function InvoiceDateField({ object, onChange, error }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Invoice Date</Form.Label>

      <Form.Control
        name="invoice_date"
        type="date"
        value={object?.invoice_date || ""}
        onChange={onChange}
      />
      <SharedError error={error} field={"invoice_date"} />
    </Form.Group>
  );
}

const InvoiceForm = {
  InvoiceDateField,
  InvoiceNumberField,
  CustomerField,
};

export default InvoiceForm;

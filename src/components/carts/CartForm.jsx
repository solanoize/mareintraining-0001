import React from "react";
import { SharedError } from "../shared";
import { Col, Form, InputGroup, Row } from "react-bootstrap";

// ui = f(state)

function ProductField({ object, error, children }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Product</Form.Label>
      <InputGroup>
        <Form.Control type="text" defaultValue={object?.product?.name} />
        {children}
      </InputGroup>
      <SharedError error={error} field={"product"} />
    </Form.Group>
  );
}

function StockField({ object, error }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Stock</Form.Label>
      <Form.Control readOnly defaultValue={object?.product?.stock || ""} />
      <SharedError error={error} field={"quantity"} />
    </Form.Group>
  );
}

function QuantityField({ object, onChange, error }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Quantity</Form.Label>
      <Form.Control
        isInvalid={object?.quantity >= object?.product?.stock}
        isValid={object?.quantity < object?.product?.stock}
        name="quantity"
        type="number"
        value={object?.quantity || ""}
        onChange={onChange}
      />
      <SharedError error={error} field={"quantity"} />
    </Form.Group>
  );
}

function DiscountField({ object, onChange, error, children }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Discount</Form.Label>
      <InputGroup>
        <Form.Control
          name="discount"
          type="number"
          value={object?.discount || 0}
          onChange={onChange}
        />
        {children}
      </InputGroup>
      <SharedError error={error} field={"discount"} />
    </Form.Group>
  );
}

function DiscountTypeField({ object, onChange }) {
  return (
    <Form.Select
      name="discount_type"
      value={object?.discount_type || 0}
      onChange={onChange}
    >
      <option value="flat">Flat (nominal)</option>
      <option value="percent">Percent (%)</option>
    </Form.Select>
  );
}

function DiscountedSubtotalField({ value }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Discounted Subtotal</Form.Label>
      <Form.Control type="number" placeholder={value || ""} disabled />
    </Form.Group>
  );
}

function SubtotalField({ value }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Subtotal</Form.Label>
      <Form.Control type="number" placeholder={value || ""} disabled />
    </Form.Group>
  );
}

const CartForm = {
  DiscountTypeField,
  DiscountField,
  ProductField,
  QuantityField,
  StockField,
  DiscountedSubtotalField,
  SubtotalField,
};

export default CartForm;

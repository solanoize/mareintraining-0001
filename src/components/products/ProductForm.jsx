import React from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { SharedError } from "../shared";

export default function ProductForm({
  object,
  onChange,
  error,
  categoryOptions,
}) {
  return (
    <React.Fragment>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            className="w-50"
            name="name"
            type="text"
            value={object?.name || ""}
            onChange={onChange}
          />
          <SharedError error={error} field={"name"} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Price
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            className="w-25"
            name="price"
            type="number"
            value={object?.price || ""}
            onChange={onChange}
          />
          <SharedError error={error} field={"price"} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Stock
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            className="w-25"
            name="stock"
            type="number"
            value={object?.stock || ""}
            onChange={onChange}
          />
          <SharedError error={error} field={"stock"} />
        </Col>
      </Form.Group>

      {categoryOptions && (
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Category {object?.meta?.category?.name}
          </Form.Label>
          <Col sm={10}>
            <InputGroup className="w-50">
              <Form.Control
                readOnly
                defaultValue={object?.category?.name || ""}
              />
              {categoryOptions}
            </InputGroup>
            <SharedError error={error} field={"category"} />
          </Col>
        </Form.Group>
      )}

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Description
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            name="description"
            as="textarea"
            rows={3}
            value={object?.description || ""}
            onChange={onChange}
          />
          <SharedError error={error} field={"description"} />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
}

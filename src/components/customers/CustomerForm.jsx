import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { SharedError } from "../shared";

export default function CustomerForm({ object, onChange, error }) {
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
            value={object?.name}
            onChange={onChange}
          />
          <SharedError error={error} field={"name"} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Phone
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            className="w-50"
            name="phone"
            type="text"
            value={object?.phone}
            onChange={onChange}
          />
          <SharedError error={error} field={"phone"} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={10}>
          <Form.Control
            className="w-50"
            name="email"
            type="email"
            value={object?.email}
            onChange={onChange}
          />
          <SharedError error={error} field={"email"} />
        </Col>
      </Form.Group>
    </React.Fragment>
  );
}

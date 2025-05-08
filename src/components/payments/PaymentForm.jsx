import React from "react";
import { Col, Form, Row } from "react-bootstrap";

export default function PaymentForm({ object, onChange }) {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              name="amount"
              value={object?.amount || 0}
              onChange={onChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </React.Fragment>
  );
}

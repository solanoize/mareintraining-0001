import { Form } from "react-bootstrap";

export default function SharedTextBox({
  label,
  name,
  type,
  children,
  options = {},
}) {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control name={name} type={type || "text"} {...options} />
      {children && children}
    </Form.Group>
  );
}

import { ButtonGroup, Col, Row } from "react-bootstrap";

export default function SharedPageHeader({ title, actions, isSubsection }) {
  return (
    <Row className="mb-3">
      <Col className="d-flex justify-content-between align-items-center gap-2">
        {!isSubsection ? <h3>{title}</h3> : <h5>{title}</h5>}
        {actions && <ButtonGroup>{actions}</ButtonGroup>}
      </Col>
    </Row>
  );
}

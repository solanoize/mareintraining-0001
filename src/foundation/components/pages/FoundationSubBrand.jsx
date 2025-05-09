import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export default function FoundationSubBrand({ title, children }) {
  return (
    <Navbar bg="light" data-bs-theme="light" className="py-2">
      <Container>
        <Navbar.Brand className="fs-5 fw-bold">{title}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end gap-3">
          {children}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

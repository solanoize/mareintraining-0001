import { Spinner } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaReact } from "react-icons/fa6";

export default function FoundationBrand({ children }) {
  return (
    <Navbar
      sticky="top"
      bg="light"
      data-bs-theme="light"
      className="py-2 border-bottom"
    >
      <Container>
        <Navbar.Brand className="fs-4 fw-bold text-primary">
          <FaReact size={32} /> React Invoice ID
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end gap-3">
          {children}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

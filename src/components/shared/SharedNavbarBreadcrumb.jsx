import { Navbar, Container } from "react-bootstrap";
import SharedBreadcrumb from "./SharedBreadcrumb";

export default function SharedNavbarBreadcrumb() {
  return (
    <Navbar bg="light" variant="light" className="py-1">
      <Container>
        <SharedBreadcrumb />
      </Container>
    </Navbar>
  );
}

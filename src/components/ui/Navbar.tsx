import { Navbar as NavbarLayout, Container, Nav, Button } from "react-bootstrap";
import Logo from '../../assets/images/logo.png';

export default function Navbar() {
  return (
    <NavbarLayout collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <NavbarLayout.Brand href="/">
            <img
              src={Logo}
              width="90"
              height="60"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
        </NavbarLayout.Brand>
        <NavbarLayout.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarLayout.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto gap-4">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/map">Maps</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/register">
              <Button variant="outline-secondary">Register</Button>
            </Nav.Link>
          </Nav>
        </NavbarLayout.Collapse>
      </Container>
    </NavbarLayout>
  )
}
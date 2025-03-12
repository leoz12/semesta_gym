import { Instagram } from "lucide-react";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="bg-black text-light text-center py-5">
      <Container fluid className="border-bottom border-light">
        <Row>
          <Col md={4}>
          </Col>
          <Col md={4}>
            <div className="d-flex justify-content-center align-items-center gap-2">
              <Instagram size={34}/>
              <p className="m-0">@SemestaGYM</p>
            </div>
            <div className="mt-4 d-flex justify-content-center gap-5">
              <a className="text-white" href="/about">About</a>
              <a className="text-white" href="/">Home</a>
              <a className="text-white" href="/map">Maps</a>
              <a className="text-white" href="https://www.instagram.com/semesta.gym?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">Instagram</a>
              <a className="text-white" href="#">Team</a>
            </div>
            <div className="mt-5">
              <p className="mb-0">Ardiansyah Putra Ritonga</p>
              <p className="">+62 812-6097-4269</p>
            </div>
          </Col>
          <Col md={4}>
            <Button variant="light" className="mt-4 rounded-pill">Download APK</Button>
          </Col>
        </Row>
      </Container>
      <Container className="mt-3">
        <p className="mb-0">© Copyright Universitas Mikroskil </p>
      </Container>
    </footer>
  )
}
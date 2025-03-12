import { Col, Container, Row } from "react-bootstrap";
import BaseLayout from "../components/BaseLayout";
import HeroMap from '../assets/images/hero-map.png';
import { MapPin } from "lucide-react";

export default function Map() {
  return (
    <BaseLayout>
      <Container fluid >
        <Row className="align-items-center position-relative">
          <Col md={12} className="position-absolute ">
            <Container className="text-center">
              <h1 className="text-light fw-bold banner-font">SEMESTA GYM</h1>
              <h1 className="text-light fw-light banner-font">MAPS</h1>
            </Container>
          </Col>
          <Col md={12} className="p-0">
            <img src={HeroMap} alt="Hero" className="img-fluid" width="100%" />
          </Col>
        </Row>
      </Container>
      <Container className="py-5">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227484.9242712775!2d103.08119665635756!3d-0.3649599544243789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30313100023f914b%3A0xd5985c3a16f025de!2sSemesta%20gym!5e0!3m2!1sid!2sid!4v1739641202158!5m2!1sid!2sid" width="100%" height={600} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

        <Row className="mt-5 justify-content-between">
          <Col md={4}>
            <h4>Semesta GYM Pusat Kebugaran di kota medan</h4>
            <p>Alamat : Jl. Alfalah No.27, Glugur Darat I, Kec. Medan Tim., Kota Medan, Sumatera Utara 20238</p>
          </Col>
          <Col md={4} className="text-end">
            <h4><MapPin size={28}/> Semesta GYM</h4>
            <p>Jl. Alfalah No.27, Glugur Darat I, Kec. Medan Tim., Kota Medan, Sumatera Utara 20238</p>
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  )
}
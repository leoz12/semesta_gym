import { Col, Container, Row } from "react-bootstrap";
import BaseLayout from "../components/BaseLayout";
import HeroAbout from '../assets/images/hero-about.png';
import AboutImg from '../assets/images/about-img.png';

export default function About() {
  return (
    <BaseLayout>
      <Container fluid >
        <Row className="align-items-center position-relative">
          <Col md={12} className="position-absolute ">
            <Container className="text-center">
              <h1 className="text-light fw-bold banner-font">
                Tentang Semesta GYM
              </h1>
            </Container>
          </Col>
          <Col md={12} className="p-0">
            <img src={HeroAbout} alt="Hero" className="img-fluid" width="100%" />
          </Col>
        </Row>
      </Container>
      <Container className="py-5">
        <Row className="my-5 align-items-center">
          <Col md={6} className="px-5">
            <p>Apa itu Semesta GYM</p>
            <h1>Semesta GYM</h1>
            <p>Semesta GYM Pusat Kebugaran untuk para pencinta GYM dan Strong People mesti tau Semesta GYM bukan GYM yang kaleng-kaleng</p>
            <p>Alamat :Jl. Alfalah No.27, Glugur Darat I, Kec. Medan Tim., Kota Medan, Sumatera Utara 20238</p>
          </Col>
          <Col md={6} className="px-5">
            <img src={AboutImg} alt="About" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </BaseLayout>
  )
}
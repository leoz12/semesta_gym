import { Button, Card, Carousel, Col, Container, Row } from "react-bootstrap";
import HeroImg from '../assets/images/hero-img.png';
import BaseLayout from "../components/BaseLayout";
import App1 from '../assets/images/app-1.png';
import App2 from '../assets/images/app-2.png';
import App3 from '../assets/images/app-3.png';
import Dev1 from '../assets/images/dev-1.png';
import Dev2 from '../assets/images/dev-2.png';
import Dev3 from '../assets/images/dev-3.png';
import Slider11 from '../assets/images/slider-1-1.jpg';
import Slider12 from '../assets/images/slider-1-2.jpg';
import Slider13 from '../assets/images/slider-1-3.jpg';
import Slider21 from '../assets/images/slider-2-1.jpg';
import Slider22 from '../assets/images/slider-2-2.jpg';
import Slider23 from '../assets/images/slider-2-3.png';

export default function Home() {
  return (
    <BaseLayout>
      <Container fluid >
        <Row className="align-items-center position-relative">
          <Col md={12} className="position-absolute ">
          <Container>
            <h1 className="text-light fw-bold">FOKUS GYM ANDA ITU APA?</h1>
            <p className="text-light">Ngapain Bingung Terus buruan Join Kita Sobat Semesta GYM</p>
            <Button href="/register" variant="light" className="mt-3">Gabung Sekarang</Button>
          </Container>
          </Col>
          <Col md={12} className="p-0">
            <img src={HeroImg} alt="Hero" className="img-fluid" width="100%" />
          </Col>
        </Row>
      </Container>
      <Container className="py-5">
        <div className="text-center mt-5">
          <h1>Fitur Aplikasi Mobile Semesta GYM</h1>
          <p className="mt-3">Temukan berbagai fitur aplikasi yang memberi kemudahan dan kenyamanan untuk berolahraga.</p>
        </div>
        <Row className="mt-5 mx-5">
          <Col md={4}>
            <img src={App1} alt="App 1" className="img-fluid" />
          </Col>
          <Col md={4}>
            <img src={App2} alt="App 2" className="img-fluid" />
          </Col>
          <Col md={4}>
            <img src={App3} alt="App 3" className="img-fluid" />
          </Col>
        </Row>
        <div className="text-center mt-5">
          <h4>Download Aplikasi Mobile Semesta GYM </h4>
          <h6 className="mt-3 text-danger">Mari akses Fitur-Fitur Semesta GYM dan Jangan lupa membeli member dan course Semesta GYM </h6>
          <Button variant="dark" className="mt-4">Download APK</Button>
        </div>
      </Container>
      <Container className="py-5">
        <h2>Developer Team</h2>  

        <Row className="mt-5">
          <Col md={4}>
            <Card className="border-0 bg-transparent">
              <Card.Img variant="top" src={Dev1} />
              <Card.Body className="px-0">
                <Card.Title>Stanly</Card.Title>
                <Card.Text>
                  IT-DEV
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 bg-transparent">
              <Card.Img variant="top" src={Dev2} />
              <Card.Body className="px-0">
                <Card.Title>Aldi</Card.Title>
                <Card.Text>
                  IT-DEV
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
          <Card className="border-0 bg-transparent">
            <Card.Img variant="top" src={Dev3} />
              <Card.Body className="px-0">
                <Card.Title>Elvens</Card.Title>
                <Card.Text>
                  IT-DEV
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid className="bg-primary-custom text-light py-5 bg-black">
        <h1 className="text-center">
          GYM For Your Own
        </h1>
      </Container>
      <Container fluid className="py-5">
        <Carousel>
          <Carousel.Item>
            <div className="position-relative" style={{ height: '600px', overflow: 'hidden', alignItems: 'center', objectFit: 'cover', display: 'flex' }}>
              <img src={Slider11} alt="Hero" className="img-fluid" width="100%" height="100%"/>
            </div>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="position-relative" style={{ height: '600px', overflow: 'hidden', alignItems: 'center', objectFit: 'cover', display: 'flex' }}>
              <img src={Slider12} alt="Hero" className="img-fluid" width="100%" height="100%"/>
            </div>
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="position-relative" style={{ height: '600px', overflow: 'hidden', alignItems: 'center', objectFit: 'cover', display: 'flex' }}>
              <img src={Slider13} alt="Hero" className="img-fluid" width="100%" height="100%"/>
            </div>
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
      <Container fluid className="bg-primary-custom text-light py-5 bg-black">
        <h1 className="text-center">
          Semesta GYM
        </h1>
      </Container>
      <Container fluid className="py-5">
        <Carousel>
          <Carousel.Item>
            <div className="position-relative" style={{ height: '600px', overflow: 'hidden', alignItems: 'center', objectFit: 'cover', display: 'flex' }}>
              <img src={Slider21} alt="Hero" className="img-fluid" width="100%" height="100%"/>
            </div>
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="position-relative" style={{ height: '600px', overflow: 'hidden', alignItems: 'center', objectFit: 'cover', display: 'flex' }}>
              <img src={Slider22} alt="Hero" className="img-fluid" width="100%" height="100%"/>
            </div>
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="position-relative" style={{ height: '600px', overflow: 'hidden', alignItems: 'center', objectFit: 'cover', display: 'flex' }}>
              <img src={Slider23} alt="Hero" className="img-fluid" width="100%" height="100%"/>
            </div>
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </BaseLayout>
  )
}
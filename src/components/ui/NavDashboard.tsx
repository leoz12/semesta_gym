import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/logo.png';

export default function NavDashboard() {
  return (
    <Navbar expand="lg" className="bg-primary-custom shadow py-3">
      <Container fluid>
      <Navbar.Brand href="/" className='d-flex align-items-center text-white'>
            <img
              src={logo}
              width="80"
              height="50"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />{' '}
          <h4 className="text-white">Semesta GYM</h4>
          </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
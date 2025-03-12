import { Button, Card } from 'react-bootstrap';
import RegisterBg from '../assets/images/register-bg.jpg';

export default function Register() {
  return (
    <div>
      <div className='position-relative' style={{ height: '100vh', overflow: 'hidden', alignItems: 'center', objectFit: 'cover', display: 'flex' }}>
        <img src={RegisterBg} alt="Register" className="img-fluid" width="100%" />
      </div>
      <div className="position-absolute top-50 start-50 translate-middle">
        <Card style={{ width: '28rem' }} className='p-3'>
          <a href="/" className='text-dark fw-bold'>
            <span>HOME</span>
          </a>
          <Card.Body>
            <h2 className='text-center mb-3'>REGISTER</h2>
            <span>Register Role Anda</span>
            <div className='d-grid gap-3 mt-2'>
              <Button href="/register-anggota" variant="light" size="lg" className='border border-secondary'>
                Anggota
              </Button>
              <Button href="/register-trainer" variant="light" size="lg" className='border border-secondary'>
                Personal Trainer
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
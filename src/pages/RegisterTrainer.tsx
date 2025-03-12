import { Alert, Button, Card, Col, Form, Row } from 'react-bootstrap';
import RegisterBg from '../assets/images/register-pt-bg.jpg';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function RegisterTrainer() {
  const [trainingFocus, setTrainingFocus] = useState([]);
  const [showAlert, setShowAlert] = useState(false);  
  const [alert, setAlert] = useState<string[]>([]);
  const [alertSuccess, setAlertSuccess] = useState(true);
  const [hoursOfPractice, setHoursOfPractice] = useState({
    start: '',
    end: ''
  });
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    trainingFocus: [] as string[],
    hoursOfPractice: '',
    price: '',
    description: '',
    picture: undefined as File | undefined
  });

  useEffect(() => {
    api.get('/training-focus').then(res => {
      setTrainingFocus(res)
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const handleSubmit = () => {
    const formattedPrice = data.price.replace(/,/g, '');
    data.price = formattedPrice;

    data.hoursOfPractice = `${hoursOfPractice.start}-${hoursOfPractice.end}`;

    if (data.password !== data.confirmPassword) {
      setAlert(['Password and Confirm Password is not same']);
      setShowAlert(true);
      return;
    }

    api.post('/trainers/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      if (res.errors) {
        setAlert(res.errors);
        setShowAlert(true);
        return;
      }
      if (res.error) {
        setAlert([res.error]);
        setShowAlert(true);
        return;
      }
      setData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        trainingFocus: [],
        hoursOfPractice: '',
        price: '',
        description: '',
        picture: undefined
      });
      setShowAlert(false);
      setAlertSuccess(false);
    }).catch(error => {
      console.error(error);
    });
  }

  const formatNumber = (value: any) => {
    const numberValue = value.replace(/[^0-9]/g, '');
    return new Intl.NumberFormat().format(numberValue);
  };

  const handlePriceChange = (e:any) => {
    const formattedValue = formatNumber(e.target.value);
    setData({ ...data, price: formattedValue });
  };

  return (
    <div>
      <div className='position-relative' style={{ height: '100vh', overflow: 'hidden', alignItems: 'center', objectFit: 'cover', display: 'flex' }}>
        <img src={RegisterBg} alt="Register" className="img-fluid" width="100%" />
      </div>
      <div className="position-absolute top-50 start-50 translate-middle">
        {alertSuccess ? 
          <Card style={{ width: '46rem' }} className='p-3'>
            <a href="/register" className='text-dark fw-bold'>
              <span>BACK</span>
            </a>
            <Card.Body>
              <h2 className='text-center mb-3'>Personal Trainer</h2>
              
              {showAlert &&
              <Alert variant={'danger'}>
                <ul>
                  {alert.map((msg: any, index: number) => (
                    <li key={index}>{msg.msg ? msg.msg : msg}</li>
                  ))}
                </ul>
              </Alert>
              }
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInputPicture">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="file" 
                      onChange={(e) => setData({ ...data, picture: (e.target as HTMLInputElement).files?.[0] })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Nama</Form.Label>
                    <Form.Control type="text" 
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" 
                      value={data.email}
                      onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>No.HP</Form.Label>
                    <Form.Control type="tel" 
                      value={data.phone}
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" 
                      value={data.password}
                      onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" 
                      value={data.confirmPassword}
                      onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInputFocus">
                    <Form.Label>Fokus</Form.Label>
                    <Select
                      isMulti
                      name="colors"
                      options={trainingFocus.map((focus: any) => ({ value: focus.id, label: focus.name }))}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(e) => setData({ ...data, trainingFocus: e.map((focus: any) => focus.value) })}
                    />
                  </Form.Group>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                        <Form.Label>Jadwal Mulai</Form.Label>
                        <Form.Control type="time" 
                          value={hoursOfPractice.start}
                          onChange={(e) => setHoursOfPractice({ ...hoursOfPractice, start: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                        <Form.Label>Jadwal Selesai</Form.Label>
                        <Form.Control type="time" 
                          value={hoursOfPractice.end}
                          onChange={(e) => setHoursOfPractice({ ...hoursOfPractice, end: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                    <Form.Label>Harga Per-Bulan/Sesi</Form.Label>
                    <Form.Control type="text" 
                      value={data.price}
                      onChange={handlePriceChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Deskripsi</Form.Label>
                    <Form.Control as="textarea" rows={8} 
                      value={data.description}
                      onChange={(e) => setData({ ...data, description: e.target.value })}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="dark" type="submit" className='w-100'
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Card.Body>
          </Card>
        : 
          <Card style={{ width: '32rem' }} className='p-3'>
            <Card.Body>
              <h2 className='text-center'>REGISTER PT DONE</h2>
              <div className='text-center mt-4'>
                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>
              </div>
              <div className='text-center mt-5'>
                <Button href="/" variant="dark" size="lg">
                  BACK TO HOME
                </Button>
              </div>
            </Card.Body>
          </Card>
        }
      </div>
    </div>
  )
}
import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { api } from "../../services/api";
import { Plus } from "lucide-react";
import Select from "react-select";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function CreateModal({ ...props }) {
  const [trainingFocus, setTrainingFocus] = useState([]);
  const [showAlert, setShowAlert] = useState(false);  
  const [alert, setAlert] = useState<string[]>([]);
  const [hoursOfPractice, setHoursOfPractice] = useState({
    start: '',
    end: ''
  });
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
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
    setData({ ...data, price: formattedPrice });
    data.hoursOfPractice = `${hoursOfPractice.start}-${hoursOfPractice.end}`;

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
      showSwal();
      setData({
        name: '',
        email: '',
        password: '',
        phone: '',
        trainingFocus: [],
        hoursOfPractice: '',
        price: '',
        description: '',
        picture: undefined
      });
      props.onHide();
    }).catch(error => {
      console.error(error);
    });
  }

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: "Berhasil",
      text: "Personal Trainer berhasil ditambahkan",
      icon: "success",
    })
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          TAMBAH PERSONAL TRAINER
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert &&
        <Alert variant={'danger'}>
          <ul>
            {alert.map((msg: any, index: number) => (
              <li key={index}>{msg.msg ? msg.msg : msg}</li>
            ))}
          </ul>
        </Alert>
        }
        <Row className="gy-3">
          <Col md={6}>
            <Form.Label htmlFor="picture">Foto</Form.Label>
            <Form.Control
              type="file"
              id="picture"
              aria-describedby="pictureHelpBlock"
              onChange={(e) => setData({ ...data, picture: (e.target as HTMLInputElement).files?.[0] })}
            />
          </Col>
          <Col md={6}>
            <Form.Label htmlFor="focus">Fokus</Form.Label>
            <Select
              isMulti
              name="colors"
              options={trainingFocus.map((focus: any) => ({ value: focus.id, label: focus.name }))}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(e) => setData({ ...data, trainingFocus: e.map((focus: any) => focus.value) })}
            />
          </Col>
          <Col md={6}>
            <Form.Label htmlFor="name">Nama Personal Trainer</Form.Label>
            <Form.Control
              type="text"
              id="name"
              aria-describedby=""
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Col>
          <Col md={6}>
            <Form.Label htmlFor="email">Email Personal Trainer</Form.Label>
            <Form.Control
              type="email"
              id="email"
              aria-describedby=""
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Col>
          <Col md={6}>
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <Form.Control
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </Col>
          <Col md={6}>
            <Form.Label htmlFor="hp">Nomor HP</Form.Label>
            <Form.Control
              type="tel"
              id="hp"
              aria-describedby=""
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </Col>
          <Col md={6}>
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
          </Col>
          <Col md={6}>
            <Form.Label htmlFor="price">Harga</Form.Label>
            <InputGroup>
              <InputGroup.Text id="basic-addon1">Rp</InputGroup.Text>
              <Form.Control
                type="text"
                id="price"
                aria-describedby=""
                value={data.price}
                onChange={handlePriceChange}
              />
            </InputGroup>
          </Col>
          <Col md={6}>
            <Form.Label htmlFor="desc">Deskripsi</Form.Label>
            <Form.Control
              as="textarea" 
              rows={3}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { props.onHide(); setShowAlert(false); }}>Close</Button>
        <Button 
          onClick={handleSubmit} 
          className="px-5">
          Tambah
          <Plus size={20} />
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
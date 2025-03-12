import { Plus } from "lucide-react";
import { useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { api } from "../../services/api";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function ModalCreateAnggota({ ...props }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<string[]>([]);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'member'
  });

  const handleSubmit = () => {
    api.post('/auth/register/', data).then(res => {
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
      setShowAlert(false);
      setData({ name: '', email: '', password: '', phone: '', role: 'member' });
      props.onHide();
    }).catch(error => {
      console.error(error);
    });
  }

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: "Berhasil",
      text: "Anggota berhasil ditambahkan",
      icon: "success",
    })
  }

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
          Tambah Anggota
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
          <Col lg={6}>
            <Form.Label htmlFor="name">Nama</Form.Label>
            <Form.Control
              type="text"
              id="name"
              aria-describedby=""
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="emaiil"
              id="email"
              aria-describedby=""
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              aria-describedby=""
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="phone">No.Hp</Form.Label>
            <Form.Control
              type="text"
              id="phone"
              aria-describedby=""
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary" 
          onClick={() => {
            props.onHide(); 
            setShowAlert(false); 
            setData({ name: '', email: '', password: '', phone: '', role: 'member' })
          }}
        >Close</Button>
        <Button onClick={handleSubmit} className="px-5">
          Simpan
          <Plus size={20} />
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
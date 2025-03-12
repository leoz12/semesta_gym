import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { api } from "../../services/api";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function ModalEditAnggota({ ...props }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{
    name: string;
    email: string;
    password?: string;
    phone: string;
    role: string;
  }>({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'member'
  });

  useEffect(() => {
    if (Object.keys(props.anggota).length !== 0) {
      setData({
        name: props.anggota.name,
        email: props.anggota.email,
        password: '',
        phone: props.anggota.phone,
        role: props.anggota.role
      })
    }
  }, [props.show, props.anggota]);

  const handleSubmit = () => {
    setLoading(true);
    if (data.password === '') {
      delete data.password;
    }
    api.put('/user/'+ props.anggota.id +'/update', data).then(res => {
      if (res.errors) {
        setAlert(res.errors);
        setShowAlert(true);
        setLoading(false);
        return;
      }
      if (res.error) {
        setAlert([res.error]);
        setShowAlert(true);
        setLoading(false);
        return;
      }
      setTimeout(() => {
        setData({
          name: '',
          email: '',
          password: '',
          phone: '',
          role: 'member'
        });

        showSwal('Anggota berhasil diubah');
        setLoading(false);
        props.onHide();
        setShowAlert(false);
      }, 2000);
    }).catch(error => {
      console.error(error);
    });
  }

  const handleDelete = () => {
    api.delete('/user/'+ props.anggota.id +'/delete').then(res => {
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
        phone: '',
        role: 'member'
      });
      
      showSwal('Anggota berhasil dihapus');
      props.onHide();
      setShowAlert(false);
    }).catch(error => {
      console.error(error);
    });
  }

  const showSwal = (text:string) => {
    withReactContent(Swal).fire({
      title: "Berhasil",
      text: text,
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
          Edit Anggota
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
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="emaiil"
              id="email"
              aria-describedby=""
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control
              type="password"
              id="password"
              aria-describedby=""
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="phone">No.Hp</Form.Label>
            <Form.Control
              type="text"
              id="phone"
              aria-describedby=""
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
      <Button 
          variant="secondary" 
          onClick={() => {props.onHide(); 
            setShowAlert(false);
            setData({
              name: '',
              email: '',
              password: '',
              phone: '',
              role: 'member'
            })
          }}
        >
          Close
        </Button>
        <div className="d-flex gap-3">
          <Button
            className="px-4" 
            onClick={handleSubmit}
            disabled={loading}
          >
            Simpan
            {loading && <span className="spinner-border spinner-border-sm ms-2"></span>}
          </Button>
          <Button 
            variant="danger" 
            className="px-4"
            onClick={handleDelete}
          >
            Hapus
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
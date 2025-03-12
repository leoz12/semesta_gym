import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { api } from "../../services/api";
import Select from "react-select";
import { Plus } from "lucide-react";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function ModalCreateCourse({ ...props }) {
  const [anggota, setAnggota] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<string[]>([]);
  const [price] = useState(0);
  const [data, setData] = useState({
    userId: '',
    price: 0,
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    api.get('/user').then(res => {
      const member = res.filter((user: any) => {
        return user.role === 'member';
      });
      setAnggota(member)
    }).catch(error => {
      console.error(error);
    });

    api.get('/pricelist/courses').then(res => {
      setData({ ...data, price: res.price });
    }).catch(error => {
      console.error(error);
    });
  }, []);

  const handleSubmit = () => {
    api.post('/courses', data).then(res => {
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
      api.post('/payments/course', {
        courseId: res.data.id,
        amount: res.data.price,
        paidAt: new Date().toISOString(),
        userId: res.data.userId,
        paymentStatus: 'success'
      }).then(res => {
        console.log(res);
      }).catch(error => {
        console.error(error);
      });

      showSwal();
      setShowAlert(false);
      setData({ userId: '', price: price, startDate: '', endDate: '' });
      props.onHide();
    }).catch(error => {
      console.error(error);
    });
  }

  const showSwal = () => {
    withReactContent(Swal).fire({
      title: "Berhasil",
      text: "Anggota Course berhasil ditambahkan",
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
          Tambah Anggota Course
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
          <Col lg={12}>
            <Form.Label htmlFor="anggota">Pilih Anggota</Form.Label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              name="anggota"
              options={anggota.map((anggota: any) => ({ value: anggota.id, label: anggota.name }))}
              onChange={(e) => setData({ ...data, userId: e?.value })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="startDate">Waktu Mulai</Form.Label>
            <Form.Control
              type="date"
              id="startDate"
              aria-describedby=""
              onChange={(e) => setData({ ...data, startDate: e.target.value })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="endDate">Waktu Selesai</Form.Label>
            <Form.Control
              type="date"
              id="endDate"
              aria-describedby=""
              onChange={(e) => setData({ ...data, endDate: e.target.value })}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary"
          onClick={() => {
            props.onHide();
            setData({ userId: '', price: 20000, startDate: '', endDate: '' });
          }}
        >
          Close
        </Button>
        <Button
          className="px-5"
          onClick={handleSubmit}
        >
          Simpan
          <Plus size={20} />
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
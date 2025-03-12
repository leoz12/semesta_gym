import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { api } from "../../services/api";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function ModalEditCourse({ ...props }) {
  const [anggota, setAnggota] = useState<{ id: string; name: string }[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<string[]>([]);
  const [data, setData] = useState({
    id: '',
    userId: '',
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
  }, []);

  useEffect(() => {
    if (Object.keys(props.anggotaCourse).length !== 0) {
      const activeCourse = props.anggotaCourse.Courses[props.anggotaCourse.Courses.length - 1];

      if (activeCourse) {
        setData({
          id: activeCourse.id,
          userId: activeCourse.userId,
          startDate: new Date(activeCourse.startDate).toISOString().split('T')[0],
          endDate: new Date(activeCourse.endDate).toISOString().split('T')[0]
        });
      }
    }
  }, [props.show, props.anggotaCourse]);

  const handleSubmit = () => {
    api.put('/courses/'+ data.id, data).then(res => {
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

      showSwal('Course berhasil diubah');
      setData({ id: '', userId: '', startDate: '', endDate: '' });
      props.onHide();
    }).catch(error => {
      console.error(error);
    });
  }

  const handleDelete = () => {
    api.delete('/courses/'+ data.id).then(res => {
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

      showSwal('Course berhasil dihapus');
      setData({ id: '', userId: '', startDate: '', endDate: '' });
      props.onHide();
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
          Edit Course
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
              key={data.userId}
              defaultValue={{ value: data.userId, label: anggota.find((anggota: any) => anggota.id === data.userId)?.name }}
              className="basic-single"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              name="anggota"
              options={anggota.map((anggota: any) => ({ value: anggota.id, label: anggota.name }))}
              onChange={(e) => setData({ ...data, userId: e?.value || '' })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="startDate">Waktu Mulai</Form.Label>
            <Form.Control
              type="date"
              id="startDate"
              aria-describedby=""
              value={data.startDate}
              onChange={(e) => setData({ ...data, startDate: e.target.value })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="endDate">Waktu Selesai</Form.Label>
            <Form.Control
              type="date"
              id="endDate"
              aria-describedby=""
              value={data.endDate}
              onChange={(e) => setData({ ...data, endDate: e.target.value })}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
      <Button 
          variant="secondary" 
          onClick={() => {props.onHide(); setData({
              id: '',
              userId: '',
              startDate: '',
              endDate: ''
            })
          }}
        >
          Close
        </Button>
        <div className="d-flex gap-3">
          <Button
            className="px-4" 
            onClick={handleSubmit}
          >
            Simpan
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
import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { api } from "../../services/api";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function EditModal({ ...props }) {
  const [trainingFocus, setTrainingFocus] = useState<{ id: string, name: string }[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<string[]>([]);
  const [data, setData] = useState({
    picture: undefined as File | undefined,
    trainingFocusId: '',
    name: '',
    numberOfPractices: '',
    description: ''
  });

  useEffect(() => {
    api.get('/training-focus').then(res => {
      setTrainingFocus(res)
    }).catch(error => {
      console.error(error);
    });
    
    if (Object.keys(props.course).length !== 0) {
      setData({
        picture: undefined as File | undefined,
        trainingFocusId: props.course.trainingFocusId,
        name: props.course.name,
        numberOfPractices: props.course.numberOfPractices,
        description: props.course.description
      })
    }
  }, [props.show, props.course]);

  const handleSubmit = () => {
    api.put('/courses/data-course/'+ props.course.id, data, {
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
        picture: undefined,
        trainingFocusId: '',
        name: '',
        numberOfPractices: '',
        description: ''
      });
      showSwal('Course berhasil diubah');
      props.onHide();
      setShowAlert(false);
    }).catch(error => {
      console.error(error);
    });
  }
  
  const handleDelete = () => {
    api.delete('/courses/data-course/'+ props.course.id).then(res => {
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
        picture: undefined,
        trainingFocusId: '',
        name: '',
        numberOfPractices: '',
        description: ''
      });
      showSwal('Course berhasil dihapus');
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
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Buat Course
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
            <Form.Label htmlFor="picture">Gambar</Form.Label>
            <Form.Control 
              type="file" 
              id="picture"
              onChange={(e) => setData({ ...data, picture: (e.target as HTMLInputElement).files?.[0] })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="trainingFocusId">Focus</Form.Label>
            <Select
              id="trainingFocusId"
              key={data.trainingFocusId}
              defaultValue={{ value: data.trainingFocusId, label: trainingFocus.find((focus: any) => focus.id === data.trainingFocusId)?.name }}
              className="basic-single"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              name="trainingFocusId"
              options={trainingFocus.map((focus: any) => ({ value: focus.id, label: focus.name }))}
              onChange={(e) => setData({ ...data, trainingFocusId: e?.value || '' })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="name">Nama Course</Form.Label>
            <Form.Control
              type="text"
              id="name"
              aria-describedby=""
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </Col>
          <Col lg={6}>
            <Form.Label htmlFor="numberOfPractices">Jumlah Praktik</Form.Label>
            <Form.Control
              type="number"
              id="numberOfPractices"
              aria-describedby=""
              value={data.numberOfPractices}
              onChange={(e) => setData({ ...data, numberOfPractices: e.target.value })}
            />
          </Col>
          <Col lg={12}>
            <Form.Label htmlFor="description">Deskripsi</Form.Label>
            <Form.Control
              as="textarea" 
              rows={4}
              id="description"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button 
          variant="secondary" 
          onClick={() => {props.onHide(); setData({
            picture: undefined,
            trainingFocusId: '',
            name: '',
            numberOfPractices: '',
            description: ''
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
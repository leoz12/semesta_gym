import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { api } from "../../services/api";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function ModalEditMember({ ...props }) {
  const [anggota, setAnggota] = useState<{ id: string; name: string }[]>([]);
  const [memberships, setMemberships] = useState<{ id: string; name: string }[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState<string[]>([]);
  const [data, setData] = useState({
    id: '',
    userId: '',
    membershipId: '',
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

    api.get('/memberships').then(res => {
      setMemberships(res)
    }).catch(error => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(props.member).length !== 0) {
      const activeMembership = props.member.UserMemberships[props.member.UserMemberships.length - 1];

      if (activeMembership) {
        setData({
          id: activeMembership.id,
          userId: activeMembership.userId,
          membershipId: activeMembership.membershipId,
          startDate: new Date(activeMembership.startDate).toISOString().split('T')[0],
          endDate: new Date(activeMembership.endDate).toISOString().split('T')[0]
        });
      }
    }
  }, [props.show, props.member]);

  const handleSubmit = () => {
    api.put('/memberships/register/'+ data.id, data).then(res => {
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
        id: '',
        userId: '',
        membershipId: '',
        startDate: '',
        endDate: ''
      });
      showSwal('Member berhasil diubah');
      props.onHide();
      setShowAlert(false);
    }).catch(error => {
      console.error(error);
    });
  }

  const handleDelete = () => {
    api.delete('/memberships/register/'+ data.id).then(res => {
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
        id: '',
        userId: '',
        membershipId: '',
        startDate: '',
        endDate: ''
      });
      showSwal('Member berhasil dihapus');
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
            <Form.Label htmlFor="membership">Pilih Membership</Form.Label>
            <Select
              key={data.membershipId}
              defaultValue={{ value: data.membershipId, label: memberships.find((membership: any) => membership.id === data.membershipId)?.name }}
              className="basic-single"
              classNamePrefix="select"
              isClearable={true}
              isSearchable={true}
              name="membership"
              options={memberships.map((membership: any) => ({ value: membership.id, label: membership.name }))}
              onChange={(e) => setData({ ...data, membershipId: e?.value || '' })}
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
              membershipId: '',
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
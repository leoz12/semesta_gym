import { useEffect, useState } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import Layout from '../components/Layout';
import { Search, Plus } from 'lucide-react';
import { api } from '../services/api';
import logo from '../assets/images/logo.png'
import CreateModal from '../components/personal-trainer/CreateModal';
import EditModal from '../components/personal-trainer/EditModal';
import numeral from 'numeral';

interface Trainer {
  id: number;
  picture: string;
  User: any;
  TrainingFocus: any;
  description: string;
  phone: string;
  hoursOfPractice: string;
  price: string;
}

export default function PersonalTrainer() {
  const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [trainer, setTrainer] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [createModalShow, setCreateModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  useEffect(() => {
    api.get('/trainers').then(res => {
      setTrainers(res)
    }).catch(error => {
      console.error(error);
    });
  }, [createModalShow, editModalShow]);
  
  const filteredTrainers = trainers.filter((trainer) => {
    return trainer.User.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleEditTrainer = (e: any) => {
    api.get(`/trainers/${e}`).then(res => {
      setTrainer(res);
    }).catch(error => {
      console.error(error);
    });
  }
  
  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Data Personal Trainer</h2>
        <Button variant="primary" className="d-flex align-items-center gap-2 rounded-pill px-3"
          onClick={() => setCreateModalShow(true)}
        >
          Tambah
          <Plus size={20} />
        </Button>
      </div>

      <div className="mb-4 d-flex justify-content-between">
        <Form.Group style={{ width: '300px' }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroup.Text>
              <Search size={20} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
      </div>

      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Gambar</th>
            <th>Personal Trainer</th>
            <th>Email</th>
            <th>Fokus Pelatihan</th>
            <th>Deskripsi</th>
            <th>No.HP</th>
            <th>Jadwal Latihan</th>
            <th>Harga</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredTrainers.map((trainer, index) => (
            <tr key={trainer.id}>
              <td>{index + 1}</td>
              <td>
                <img src={trainer.picture !== null ? BASE_URL + '/' + trainer.picture : logo} alt='' style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{trainer.User.name}</td>
              <td>{trainer.User.email}</td>
              <td>{trainer.TrainingFocus.map((focus: any) => focus.name).join(', ')}</td>
              <td>{trainer.description}</td>
              <td>{trainer.User.phone}</td>
              <td>{trainer.hoursOfPractice}</td>
              <td>{numeral(trainer.price).format('0,0')}</td>
              <td>
                <Button
                  variant="link" 
                  className="p-0"
                  onClick={() => {setEditModalShow(true); handleEditTrainer(trainer.id)}}
                  >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <CreateModal
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />
      <EditModal
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        trainer={trainer}
      />
    </Layout>
  );
}
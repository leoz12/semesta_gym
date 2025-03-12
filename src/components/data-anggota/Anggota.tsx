import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button, Form, InputGroup, Table } from "react-bootstrap";
import { Plus, Search } from "lucide-react";
import ModalCreateAnggota from "./ModalCreateAnggota";
import ModalEditAnggota from "./ModalEditAnggota";

interface Anggota {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export default function Anggota() {
  const [anggotas, setAnggotas] = useState<Anggota[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [createModalShow, setCreateModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [anggota, setAnggota] = useState({});

  useEffect(() => {
    api.get('/user').then(res => {
      const member = res.filter((user: any) => {
        return user.role === 'member';
      });
      setAnggotas(member);
    }).catch(error => {
      console.error(error);
    });
  }, [
    createModalShow,
    editModalShow
  ]);

  const filteredAnggota = anggotas.filter((member) => {
    return member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.phone.includes(searchTerm);
  });

  return (
    <div>
      <div className="mb-4 d-flex justify-content-between">
        <Form.Group style={{ width: '300px' }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Cari anggota..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroup.Text>
              <Search size={20} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" className="d-flex align-items-center gap-2 rounded-pill px-3" onClick={() => setCreateModalShow(true)}>
          Tambah Anggota
          <Plus size={20} />
        </Button>
      </div>
      <Table hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Email</th>
            <th>No.Hp</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredAnggota.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>
                <Button 
                  variant="link" 
                  className="p-0"
                  onClick={() => {
                    setEditModalShow(true);
                    setAnggota(member);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalCreateAnggota
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />

      <ModalEditAnggota
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        anggota={anggota}
      />
    </div>
  )
}
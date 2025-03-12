import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Badge, Button, Form, InputGroup, Table } from "react-bootstrap";
import { Plus, Search } from "lucide-react";
import ModalEditMember from "./ModalEditMember";
import ModalCreateMember from "./ModalCreateMember";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  UserMemberships: any[];
}

export default function Member() {
  const [members, setMembers] = useState<Member[]>([]);
  const [member, setMember] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [createModalShow, setCreateModalShow] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);

  useEffect(() => {
    api.get('/user').then(res => {
      const members = res.filter((user: any) => {
        return user.role === 'member';
      });
      setMembers(members);
    }).catch(error => {
      console.error(error);
    });
  }, [
    createModalShow,
    editModalShow
  ]);

  const listMembers = members.filter((user: any) => {
    return user.UserMemberships.length !== 0;
  }).filter((user: any) => {
    return user.UserMemberships.some((membership: any) => new Date(membership.endDate) > new Date());
  });

  const filteredMembers = listMembers.filter((member) => {
    const data = member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                member.phone.includes(searchTerm);
    return data;
  });

  return (
    <div>
      <div className="mb-4 d-flex justify-content-between">
        <Form.Group style={{ width: '300px' }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Cari member..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputGroup.Text>
              <Search size={20} />
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" className="d-flex align-items-center gap-2 rounded-pill px-3" onClick={() => setCreateModalShow(true)}>
          Tambah Member
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
            <th>Pembayaran</th>
            <th>Expired</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member, index) => (
            <tr key={member.id}>
              <td>{index + 1}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{new Date(member.UserMemberships[member.UserMemberships.length - 1].createdAt).toLocaleDateString()}</td>
              <td>{new Date(member.UserMemberships[member.UserMemberships.length - 1].endDate).toLocaleDateString()}</td>
              <td>
                <Badge bg="success" pill>Member</Badge>
              </td>
              <td>
                <Button 
                  variant="link" 
                  className="p-0"
                  onClick={() => {
                    setEditModalShow(true);
                    setMember(member);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalCreateMember
        show={createModalShow}
        onHide={() => setCreateModalShow(false)}
      />

      <ModalEditMember
        show={editModalShow}
        onHide={() => setEditModalShow(false)}
        member={member}
      />
    </div>
  )
}